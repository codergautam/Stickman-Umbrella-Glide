import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Text,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GameCanvasProps {
  gameState: string;
  isPaused: boolean;
  onScoreUpdate: (score: number) => void;
  onGameOver: (score: number) => void;
  onCoinCollect?: (amount: number) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  isPaused,
  onScoreUpdate,
  onGameOver,
  onCoinCollect,
}) => {
  const [score, setScore] = useState(0);
  const [isUmbrellaOpen, setIsUmbrellaOpen] = useState(false);
  const playerY = useRef(new Animated.Value(SCREEN_HEIGHT / 3)).current;
  const playerX = useRef(new Animated.Value(SCREEN_WIDTH / 2)).current;

  const animationFrameRef = useRef<number>();
  const velocityRef = useRef({ vx: 0, vy: 0 });

  // Pan Responder for touch controls
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsUmbrellaOpen(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Move player horizontally based on touch position
        const newX = Math.max(
          30,
          Math.min(SCREEN_WIDTH - 30, gestureState.moveX)
        );
        playerX.setValue(newX);
      },
      onPanResponderRelease: () => {
        setIsUmbrellaOpen(false);
      },
    })
  ).current;

  // Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING' || isPaused) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let lastTime = Date.now();
    let currentScore = 0;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      // Physics
      const gravity = isUmbrellaOpen ? 0.15 : 0.5;
      velocityRef.current.vy += gravity;

      // Terminal velocity
      const maxVelocity = isUmbrellaOpen ? 3 : 15;
      if (velocityRef.current.vy > maxVelocity) {
        velocityRef.current.vy = maxVelocity;
      }

      // Update position
      playerY.setValue((prev: any) => {
        const newY = prev + velocityRef.current.vy;

        // Check boundaries
        if (newY > SCREEN_HEIGHT) {
          onGameOver(currentScore);
          return prev;
        }

        return newY;
      });

      // Update score
      currentScore += velocityRef.current.vy * 0.1;
      setScore(Math.floor(currentScore));
      onScoreUpdate(Math.floor(currentScore));

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, isPaused, isUmbrellaOpen, onScoreUpdate, onGameOver]);

  // Reset on game start
  useEffect(() => {
    if (gameState === 'PLAYING') {
      playerY.setValue(SCREEN_HEIGHT / 3);
      playerX.setValue(SCREEN_WIDTH / 2);
      velocityRef.current = { vx: 0, vy: 0 };
      setScore(0);
      setIsUmbrellaOpen(false);
    }
  }, [gameState]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Sky Background */}
      <View style={[styles.background, styles.skyGradient]} />

      {/* Player (Stickman with Umbrella) */}
      <Animated.View
        style={[
          styles.player,
          {
            left: playerX,
            top: playerY,
          },
        ]}
      >
        {/* Umbrella */}
        {isUmbrellaOpen && (
          <View style={styles.umbrella}>
            <View style={styles.umbrellaCanopy} />
            <View style={styles.umbrellaHandle} />
          </View>
        )}

        {/* Stickman */}
        <View style={styles.stickman}>
          {/* Head */}
          <View style={styles.head} />
          {/* Body */}
          <View style={styles.body} />
          {/* Arms */}
          <View
            style={[
              styles.arms,
              isUmbrellaOpen ? styles.armsUp : styles.armsSpread,
            ]}
          />
          {/* Legs */}
          <View style={styles.legs} />
        </View>
      </Animated.View>

      {/* Instructions */}
      {score < 50 && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Tap & Hold to Open Umbrella
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  skyGradient: {
    backgroundColor: '#87ceeb',
  },
  player: {
    position: 'absolute',
    width: 60,
    height: 80,
    marginLeft: -30,
    marginTop: -40,
  },
  umbrella: {
    position: 'absolute',
    top: -30,
    left: 5,
    width: 50,
    height: 30,
    alignItems: 'center',
  },
  umbrellaCanopy: {
    width: 50,
    height: 25,
    backgroundColor: '#ef4444',
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  umbrellaHandle: {
    width: 3,
    height: 20,
    backgroundColor: '#8b5cf6',
  },
  stickman: {
    alignItems: 'center',
  },
  head: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fbbf24',
    borderWidth: 2,
    borderColor: '#000',
  },
  body: {
    width: 3,
    height: 25,
    backgroundColor: '#000',
    marginTop: 2,
  },
  arms: {
    width: 30,
    height: 3,
    backgroundColor: '#000',
    marginTop: -15,
  },
  armsUp: {
    transform: [{ rotate: '-45deg' }],
  },
  armsSpread: {
    transform: [{ rotate: '0deg' }],
  },
  legs: {
    width: 20,
    height: 3,
    backgroundColor: '#000',
    marginTop: 10,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default GameCanvas;
