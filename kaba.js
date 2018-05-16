const Kaba = require("kaba");

module.exports = (new Kaba())
    .addJavaScriptEntries({
        "privacy-manager": "./PrivacyManager.js",
    })
    .addSassEntries({
        "privacy-manager": "./scss/style.scss",
    })
    .setOutputPath("dist")
    .disableChunkSplitting()
    .disableFileNameHashing()
    .disableModuleConcatenation();
