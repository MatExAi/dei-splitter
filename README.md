# dei-splitter
DEI Splitter - Electricity Bill Calculator with PDF Upload. Installable Windows and Android apps.

## Features

- 📄 PDF Upload & Analysis
- ⚡ Electricity consumption calculation
- 💰 Bill splitting between properties
- 💻 Available as Windows desktop app (.exe)
- 📱 Available as Android mobile app (.apk)
- 🌐 Available as web app

## Installation

### Windows

Download the latest `.exe` installer from [Releases](https://github.com/MatExAi/dei-splitter/releases) and run it.

### Android

Download the latest `.apk` file from [Releases](https://github.com/MatExAi/dei-splitter/releases) and install it on your Android device.

### Web App

Visit the hosted web app at [your-domain.com]

## Development

### Prerequisites

- Node.js 20+ and npm
- For Windows builds: Windows OS or Windows build environment
- For Android builds: Java 17+ and Android SDK

### Setup

```bash
# Clone the repository
git clone https://github.com/MatExAi/dei-splitter.git
cd dei-splitter

# Install dependencies
npm install

# Run development server
npm run dev
```

## Building

### Web App

```bash
npm run build:web
```

Output: `dist/web/`

### Windows Desktop App

```bash
# Build web app first
npm run build:web

# Build Windows installer
npm run dist:win
```

Output: `dist/*.exe`

### Android App

```bash
# Build web app first
npm run build:web

# Sync Capacitor
npx cap sync android

# Build Android APK
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/*.apk`

Or use the shortcut:

```bash
npm run build:android:apk
```

## GitHub Actions CI/CD

The project includes automated build workflows:

### Automated Builds

- **Windows**: Builds `.exe` installer on every push to `main`
- **Android**: Builds `.apk` file on every push to `main`
- Both workflows upload artifacts for download

### Creating a Release

To create a new release with installable files:

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

This will:
1. Trigger both build workflows
2. Build Windows .exe and Android .apk
3. Create a GitHub Release
4. Attach the built files to the release

## Project Structure

```
dei-splitter/
├── .github/
│   └── workflows/
│       ├── build-windows.yml    # Windows build workflow
│       └── build-android.yml    # Android build workflow
├── electron/
│   └── main.js                  # Electron main process
├── android/                     # Android project (created by Capacitor)
├── dist/
│   ├── web/                     # Built web app
│   └── *.exe                    # Windows installers
├── src/                         # Web app source code
├── capacitor.config.ts          # Capacitor configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Technology Stack

- **Frontend**: React + Vite
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Build**: electron-builder, Gradle
- **CI/CD**: GitHub Actions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

MatExAi
