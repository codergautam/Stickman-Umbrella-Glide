# Stickman Umbrella Glide - Mobile (Expo)

React Native mobile version of Stickman Umbrella Glide built with Expo.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- OR Expo Go app on your physical device

### Installation

1. **Install dependencies:**
   ```bash
   cd mobile
   npm install
   ```

2. **Add app icons** (optional for development):
   - Place icon.png (1024x1024) in `assets/`
   - Place adaptive-icon.png (1024x1024) in `assets/`
   - Place splash.png in `assets/`
   - See `assets/ASSETS_README.md` for details

### Running the App

#### Option 1: Development with Expo Go (Recommended for Testing)

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open on your device:**
   - **iOS**: Scan QR code with Camera app (requires iOS device)
   - **Android**: Scan QR code with Expo Go app
   - **iOS Simulator**: Press `i` in terminal (Mac only)
   - **Android Emulator**: Press `a` in terminal

#### Option 2: Production Build

For iOS:
```bash
npx expo build:ios
```

For Android:
```bash
npx expo build:android
```

## 📱 Controls

- **Tap & Hold**: Open umbrella (slow descent)
- **Release**: Close umbrella (fast fall)
- **Move device**: Control horizontal movement (accelerometer)

## 🎮 Features

### Current Implementation:
- ✅ Basic game mechanics
- ✅ Touch controls
- ✅ Score tracking
- ✅ High score persistence (AsyncStorage)
- ✅ Pause/Resume functionality
- ✅ Game over screen
- ✅ Player name generation
- ✅ Responsive UI for all screen sizes

### Simplified for Mobile:
- Simplified physics system
- Basic stickman rendering (no complex animations)
- Touch-based controls instead of mouse
- AsyncStorage instead of LocalStorage
- No Firebase integration (can be added)

## 📂 Project Structure

```
mobile/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Main game screen
├── components/             # React Native components
│   └── GameCanvas.tsx     # Game canvas component
├── assets/                # App icons and images
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## 🔧 Configuration

### App Settings (`app.json`)

- **Bundle ID (iOS)**: `com.thearkcrown.stickmanumbrellaglide`
- **Package Name (Android)**: `com.thearkcrown.stickmanumbrellaglide`
- **Orientation**: Portrait only
- **Theme**: Dark mode

### Customization

1. **Change app name**: Edit `name` in `app.json`
2. **Change bundle ID**: Edit `ios.bundleIdentifier` and `android.package`
3. **Add splash screen**: Replace `assets/splash.png`
4. **Add app icon**: Replace `assets/icon.png`

## 🎨 Styling

The app uses React Native StyleSheet with:
- Dark theme (#1a202c background)
- Gradient text effects
- Responsive sizing
- Platform-specific optimizations

## 📊 Data Persistence

Uses `@react-native-async-storage/async-storage` for:
- High scores
- Coin count
- Player name

Data persists across app restarts.

## 🐛 Debugging

### Enable Debug Mode:
```bash
npm start
# Press 'd' to open developer menu
# Or shake device to open menu
```

### Common Issues:

**Metro bundler not starting:**
```bash
npx expo start --clear
```

**Dependencies not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**iOS build errors:**
```bash
cd ios && pod install && cd ..
```

## 🚀 Deployment

### iOS App Store

1. Build for iOS:
   ```bash
   npx expo build:ios
   ```

2. Upload to App Store Connect
3. Submit for review

### Google Play Store

1. Build for Android:
   ```bash
   npx expo build:android
   ```

2. Sign the APK/AAB
3. Upload to Play Console
4. Submit for review

### Over-The-Air Updates (EAS Update)

```bash
npm install -g eas-cli
eas update
```

## 📝 Notes

### Differences from Web Version:

1. **Canvas Rendering**:
   - Web uses HTML Canvas
   - Mobile uses React Native Animated API
   - For advanced graphics, consider `expo-gl` or `react-native-skia`

2. **Controls**:
   - Web: Mouse/Touch
   - Mobile: Touch + Accelerometer

3. **Storage**:
   - Web: LocalStorage
   - Mobile: AsyncStorage

4. **Performance**:
   - Mobile version is optimized for 60 FPS
   - Simplified particle system
   - Reduced visual effects

### Future Enhancements:

- [ ] Add Firebase integration for leaderboards
- [ ] Implement full canvas rendering with expo-gl
- [ ] Add haptic feedback
- [ ] Add sound effects and music
- [ ] Implement power-ups
- [ ] Add multiplayer support
- [ ] Add social sharing

## 📖 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🤝 Contributing

To contribute to the mobile version:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## 📄 License

Same license as the main project.

## 💬 Support

For issues specific to the mobile version:
1. Check this README
2. Review Expo documentation
3. Open an issue on GitHub
4. Join the Expo Discord

---

**Happy Coding! 🎮📱**
