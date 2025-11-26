# Quick Setup Guide

## Step 1: Install Expo CLI globally (if not installed)

```bash
npm install -g expo-cli
# OR
npm install -g @expo/cli
```

## Step 2: Navigate to mobile directory

```bash
cd mobile
```

## Step 3: Install dependencies

```bash
npm install
```

## Step 4: Start development server

```bash
npm start
```

This will open Expo DevTools in your browser and show a QR code.

## Step 5: Run on device or emulator

### Option A: Physical Device (Recommended for first test)

1. Install **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code shown in terminal with:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

3. Game will load on your device!

### Option B: iOS Simulator (Mac only)

1. Install Xcode from Mac App Store
2. Open Xcode → Preferences → Components → Install a simulator
3. In terminal, press **`i`** to open iOS simulator
4. Game will load in simulator

### Option C: Android Emulator

1. Install Android Studio
2. Open AVD Manager and create/start an emulator
3. In terminal, press **`a`** to open in Android emulator
4. Game will load in emulator

## Troubleshooting

### "Metro bundler has encountered an error"

```bash
npx expo start --clear
```

### "Cannot connect to Metro"

Make sure:
- Your phone and computer are on the same WiFi network
- Firewall is not blocking connections
- Try connecting via tunnel: `npm start --tunnel`

### Dependencies not installing

```bash
rm -rf node_modules package-lock.json
npm install
```

## Common Commands

```bash
# Start with cache cleared
npm start -- --clear

# Start with tunnel (for different networks)
npm start -- --tunnel

# Open in iOS simulator
npm start
# Then press 'i'

# Open in Android emulator
npm start
# Then press 'a'

# View logs
npm start
# Then press 'd' and select "Open React Devtools"
```

## Next Steps

Once the app is running:

1. ✅ Test tap & hold controls
2. ✅ Try playing the game
3. ✅ Check score saving works
4. ✅ Customize the game (see README.md)
5. ✅ Add your own assets (see assets/ASSETS_README.md)

## Need Help?

- Read the full [README.md](./README.md)
- Check [Expo Documentation](https://docs.expo.dev/)
- Check [Expo Forums](https://forums.expo.dev/)

---

**Enjoy building! 🚀**
