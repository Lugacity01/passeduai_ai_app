# PassEduAI mobile

A lightweight Expo + React Native starter using TypeScript. This setup contains a welcome screen only; authentication, exam practice, AI features, and backend integration are future work.

## Get started

Use Node.js 22.19 or newer in the Node 22 LTS line, with npm.

```sh
npm ci
npm start
```

Install Expo Go on your phone, connect the phone and computer to the same Wi-Fi, and scan the QR code shown by Expo. This starter uses Expo SDK 57, the Expo Go-compatible version at setup time. Expo Go must support the project's SDK version.

For an already configured Android emulator, use `npm run android`. `npm run ios` opens the iOS simulator on macOS; Windows users can preview on a physical iPhone through Expo Go.

## Checks

```sh
npm run typecheck
npx expo install --check
```

## Where to begin

- `App.tsx`: the first screen. React Native uses `View` and `Text` for layout and text, and `StyleSheet` for styling.
- `index.ts`: registers the app with Expo.
- `app.json`: app name, icons, and platform configuration.
- `tsconfig.json`: TypeScript configuration with strict checking enabled.

The icons are Expo template placeholders. No API credentials or production integrations are configured. Keep secrets out of source control; any future `EXPO_PUBLIC_` variable will be visible in the app bundle.

## Dependency status

At initialization, `npm audit` reported five high-severity entries in Expo's tooling dependency chain, involving `node-forge` and `zod`. Its proposed forced fix downgrades Expo to SDK 44 and is not appropriate for this starter. Review upstream fixes before release; do not run `npm audit fix --force` blindly.
