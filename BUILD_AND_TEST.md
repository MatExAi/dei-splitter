# Οδηγίες Testing και Download του .exe

## Τρέχουσα Κατάσταση

Το repository έχει **ολοκληρωθεί** με όλα τα βασικά αρχεία:

✅ Core Application Files (App.tsx, index.tsx, types.ts, constants.ts, index.html)
✅ Components (5 files): Layout, BillWizard, Results, TariffWatch, History
✅ Services (3 files): calcEngine, geminiService, pdfService
✅ Infrastructure: Electron, GitHub Actions, Config files

## Επόμενα Βήματα για .exe Download

### Βήμα 1: Clone και Install
```bash
git clone https://github.com/MatExAi/dei-splitter.git
cd dei-splitter
npm install
```

### Βήμα 2: Commit package-lock.json
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### Βήμα 3: Create Release Tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Βήμα 4: Download .exe
1. Πήγαινε στο https://github.com/MatExAi/dei-splitter/actions
2. Περίμενε το "Build Windows Installer" να ολοκληρωθεί
3. Download το artifact "windows-installer"

## Quick Testing (Τοπικά)

### Web App:
```bash
npm run dev
```

### Windows .exe:
```bash
cd electron
npm install
npm run build:win
```
Το .exe θα είναι στο `electron/dist/`

## Troubleshooting

- **GitHub Actions fail**: Βεβαιώσου ότι υπάρχει package-lock.json
- **.exe δεν τρέχει**: Ελέγξε Windows Defender
- **Dependencies errors**: `rm -rf node_modules && npm install`

## Οδηγίες Android APK Build

### Προετοιμασία Android Environment

#### Προαπαιτούμενα:
1. **Java JDK 17** - Κατέβασε και εγκατέστησε από [https://adoptium.net/](https://adoptium.net/)
2. **Android Studio** - Κατέβασε από [https://developer.android.com/studio](https://developer.android.com/studio)
3. **Node.js 20+** και **npm**

### Βήμα 1: Αρχική Εγκατάσταση

```bash
# Clone και εγκατάσταση βασικών dependencies
git clone https://github.com/MatExAi/dei-splitter.git
cd dei-splitter
npm install

# Build το web app
npm run build
```

### Βήμα 2: Εγκατάσταση Capacitor

```bash
# Εγκατάσταση Capacitor globally
npm install -g @capacitor/cli

# Δημιουργία android folder
mkdir android
cd android
npm init -y
npm install @capacitor/core @capacitor/android
```

### Βήμα 3: Αρχικοποίηση Android Platform

```bash
# Από το android folder
npx cap add android

# Sync το web app με το Android project
npx cap sync
```

### Βήμα 4: Build Android APK

#### Τοπικά (Development APK):
```bash
cd android/android
./gradlew assembleDebug
```

Το Debug APK θα είναι στο: `android/android/app/build/outputs/apk/debug/app-debug.apk`

#### Production APK (Release):
```bash
cd android/android
./gradlew assembleRelease
```

Το Release APK θα είναι στο: `android/android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Βήμα 5: Download APK από GitHub Actions

1. Πήγαινε στο [https://github.com/MatExAi/dei-splitter/actions](https://github.com/MatExAi/dei-splitter/actions)
2. Κλικ στο "Build Multi-Platform Installers"
3. Περίμενε να ολοκληρωθεί το build-android job
4. Download το artifact "android-apk"

### Troubleshooting Android

- **Gradle errors**: Σίγουρα ότι το Java 17 είναι εγκατεστημένο (`java -version`)
- **Android SDK missing**: Άνοιξε το Android Studio και εγκατάστησε SDK Tools
- **Permission denied ./gradlew**: Τρέξε `chmod +x android/android/gradlew`
- **Capacitor sync fails**: Διαγραφή `android/android` folder και ξανά `npx cap add android`

### Δοκιμή APK σε Android Device

1. Ενεργοποίησε "Developer Options" στο Android σου
2. Ενεργοποίησε "USB Debugging"
3. Σύνδεσε το device με USB
4. Εγκατάστησε το APK:
```bash
adb install app-debug.apk
```

Ή στείλε το APK file στο κινητό και εγκατάστησέ το χειροκίνητα.
