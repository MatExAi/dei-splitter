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
