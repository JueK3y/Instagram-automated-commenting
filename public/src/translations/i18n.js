const fs = require("fs");
const path = require("path");
const log = require("electron-log");
const { app } = require("electron");
let loadedLanguage;

log.info("--- Renderer start of IAC 2.0 ---");

/*function i18n() {
	if (fs.existsSync(path.join(__dirname, app.getLocale() + '.json'))) {
		loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.json'), 'utf8'))
	}
	else {
		loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'))
	}
}

i18n.prototype.__ = function (phrase) {
	let translation = loadedLanguage[phrase]
	if (translation === undefined) {
		translation = phrase
	}
	return translation
}*/
