# Assets Directory

This directory should contain the following image assets for the Expo mobile app:

## Required Assets:

1. **icon.png** (1024x1024px)
   - App icon for iOS and Android
   - Should be a square PNG with transparent or colored background

2. **adaptive-icon.png** (1024x1024px)
   - Android adaptive icon foreground
   - Should have transparent background with icon content centered

3. **splash.png** (1284x2778px recommended)
   - Splash screen image
   - Will be shown when app is loading
   - Background color set to #1a202c in app.json

4. **favicon.png** (48x48px or larger)
   - For web version if using Expo web

## Creating Assets:

You can use any graphic design tool to create these assets. For quick testing:
- Use a simple colored square with the game logo
- Can use https://www.appicon.co/ to generate app icons
- Can use Figma or Canva to design custom icons

## Placeholder Assets:

If you don't have custom assets ready, you can:
1. Use the default Expo assets (will show warnings)
2. Create simple colored placeholders
3. Use the web version assets and convert them to appropriate sizes

Once you have the assets, place them in this directory and they will be automatically included in the build.
