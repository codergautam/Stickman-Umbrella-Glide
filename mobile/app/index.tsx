import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameCanvas from '../components/GameCanvas';

enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GameScreen() {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [playerName, setPlayerName] = useState('Player');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      const storedCoins = await AsyncStorage.getItem('coins');
      const storedName = await AsyncStorage.getItem('playerName');

      if (storedHighScore) setHighScore(parseInt(storedHighScore));
      if (storedCoins) setCoins(parseInt(storedCoins));
      if (storedName) setPlayerName(storedName);
      else {
        const newName = generatePlayerName();
        setPlayerName(newName);
        await AsyncStorage.setItem('playerName', newName);
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const generatePlayerName = () => {
    const adjectives = ['Swift', 'Brave', 'Flying', 'Epic', 'Mighty'];
    const nouns = ['Glider', 'Diver', 'Falcon', 'Eagle', 'Hawk'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `${adj}${noun}${num}`;
  };

  const handleStart = () => {
    setScore(0);
    setGameState(GameState.PLAYING);
    setIsPaused(false);
  };

  const handleGameOver = async (finalScore: number) => {
    setGameState(GameState.GAME_OVER);

    if (finalScore > highScore) {
      setHighScore(finalScore);
      await AsyncStorage.setItem('highScore', finalScore.toString());
    }
  };

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  const handleCoinCollect = async (amount: number) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    await AsyncStorage.setItem('coins', newCoins.toString());
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  if (gameState === GameState.START) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.startScreen}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>STICKMAN</Text>
              <Text style={styles.title}>UMBRELLA</Text>
              <Text style={styles.title}>GLIDE</Text>
              <Text style={styles.subtitle}>☂️ Hold the Sky, Drop with Style ☂️</Text>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsTitle}>🎮 HOW TO PLAY:</Text>
              <Text style={styles.instructionsText}>
                • Tap & Hold to <Text style={styles.textBlue}>Open Umbrella</Text> (Slow)
              </Text>
              <Text style={styles.instructionsText}>
                • Release to <Text style={styles.textRed}>Dive Fast</Text>
              </Text>
              <Text style={styles.instructionsText}>
                • Tilt device to move
              </Text>
            </View>

            {/* Player Info */}
            <View style={styles.playerInfoBox}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>🏆 Best</Text>
                  <Text style={styles.statValue}>{highScore}m</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>👤 Player</Text>
                  <Text style={styles.statValueSmall}>{playerName}</Text>
                </View>
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>🚀 START GAME</Text>
            </TouchableOpacity>

            {/* Coins Display */}
            <View style={styles.coinsDisplay}>
              <Text style={styles.coinsText}>💰 {coins} coins</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (gameState === GameState.PLAYING) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gameContainer}>
          {/* HUD */}
          {!isPaused && (
            <View style={styles.hud}>
              <View style={styles.hudLeft}>
                <Text style={styles.hudLabel}>DEPTH</Text>
                <Text style={styles.hudValue}>{score}m</Text>
              </View>
              <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
                <Text style={styles.pauseButtonText}>⏸️</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Game Canvas */}
          <GameCanvas
            gameState={gameState}
            isPaused={isPaused}
            onScoreUpdate={handleScoreUpdate}
            onGameOver={handleGameOver}
            onCoinCollect={handleCoinCollect}
          />

          {/* Pause Overlay */}
          {isPaused && (
            <View style={styles.pauseOverlay}>
              <View style={styles.pauseBox}>
                <Text style={styles.pauseTitle}>⏸️ PAUSED</Text>
                <TouchableOpacity style={styles.resumeButton} onPress={handleResume}>
                  <Text style={styles.resumeButtonText}>▶️ Resume</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => setGameState(GameState.START)}
                >
                  <Text style={styles.homeButtonText}>🏠 Home</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // Game Over Screen
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverTitle}>GAME OVER</Text>
        <Text style={styles.gameOverScore}>{score}m</Text>

        {score > highScore && (
          <Text style={styles.newHighScore}>🎉 NEW HIGH SCORE! 🎉</Text>
        )}

        <TouchableOpacity style={styles.retryButton} onPress={handleStart}>
          <Text style={styles.retryButtonText}>🔄 TRY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButtonAlt}
          onPress={() => setGameState(GameState.START)}
        >
          <Text style={styles.homeButtonTextAlt}>🏠 HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  startScreen: {
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#60a5fa',
    textAlign: 'center',
    textShadowColor: '#a78bfa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginTop: 10,
  },
  instructionsBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#93c5fd',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#e5e7eb',
    marginBottom: 5,
  },
  textBlue: {
    color: '#60a5fa',
    fontWeight: 'bold',
  },
  textRed: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  playerInfoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  statValueSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#93c5fd',
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  coinsDisplay: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  coinsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  gameContainer: {
    flex: 1,
  },
  hud: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 10,
  },
  hudLeft: {},
  hudLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  hudValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
  },
  pauseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  pauseButtonText: {
    fontSize: 24,
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  pauseBox: {
    backgroundColor: '#1f2937',
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
  },
  pauseTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 30,
  },
  resumeButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  resumeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  homeButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: 200,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
  },
  gameOverTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 20,
  },
  gameOverScore: {
    fontSize: 64,
    fontWeight: '900',
    color: '#fbbf24',
    marginBottom: 20,
  },
  newHighScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 30,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginBottom: 15,
  },
  retryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  homeButtonAlt: {
    backgroundColor: '#374151',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  homeButtonTextAlt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
