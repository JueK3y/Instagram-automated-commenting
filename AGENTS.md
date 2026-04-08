# AGENTS.md

## Cursor Cloud specific instructions

### Project structure
All application code lives under `/workspace/public/`. The root `package.json`, `main.js`, and `index.html` are there — not at the repository root.

### Running the app
- **Install deps:** `cd /workspace/public && npm install`
- **Start (dev):** `cd /workspace/public && DISPLAY=:1 npm start` (runs `electron .`)
- The app opens a GUI window via Xvfb on `:1`. Use `computerUse` subagent or VNC to interact with it.

### Linux platform caveats
- `systemPreferences.getAccentColor()` in `main.js` is Windows/macOS-only. On Linux it throws. The committed fix wraps it in a try/catch. If the fix is not merged, the app will crash on startup — wrap the call in `try {} catch (_) {}` before running.
- The `systemPreferences.on('accent-color-changed', ...)` listener has the same issue and also needs a try/catch guard on Linux.
- D-Bus errors (`Failed to connect to the bus`) in the console are harmless on headless Linux; ignore them.
- GPU process errors (`Exiting GPU process due to errors during initialization`) are expected on headless Linux with no GPU; the app falls back to software rendering.

### No lint / no tests
- This project has **no ESLint config** and **no test suite** (`npm test` just echoes an error).
- There is no lint command to run.
- Only `npm start` (dev) and `npm run dist` / `npm run pack` (build) are defined.

### Build (packaging)
- `npm run pack` — builds unpacked distributable
- `npm run dist` — builds full distributable (configured for Windows NSIS only)
- Both use `electron-builder` and are optional for development.

### External dependencies
- **Chrome/Chromium:** `puppeteer-core` does not bundle Chromium. Google Chrome must be installed on the system.
- **keytar:** Requires `libsecret-1-dev` and `gnome-keyring` on Linux for OS keychain integration.
- **Xvfb:** Required for headless Electron rendering (already running on `:1` in cloud VMs).
