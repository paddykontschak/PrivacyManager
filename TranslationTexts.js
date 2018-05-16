/**
 * @typedef {{
 *      bannerText: string,
 *      bannerAcceptLabel: string,
 *      bannerConfigureLabel: string,
 *      title: string,
 *      introText: string,
 *      privacyPageLabel: string,
 *      categoriesTitle: string,
 *      comparisonTitleAllowed: string,
 *      comparisonTitleDisallowed: string,
 *      saveButtonLabel: string,
 *      saveDateLabel: string,
 *      necessaryLabel: string,
 *      necessaryTexts: string[],
 *      comfortLabel: string,
 *      comfortTexts: string[],
 *      statisticLabel: string,
 *      statisticTexts: string[],
 *      targetingLabel: string,
 *      targetingTexts: string[],
 * }} PrivacyManagerTranslationTexts
 */

/**
 * @type {PrivacyManagerTranslationTexts}
 */
const GERMAN_TEXTS = {
    bannerText: "Diese Webseite nutzt Cookies für Funktions-, Komfort- und Statistikzwecke. Mit Klick auf „Ändern“ können Sie die Cookie-Einstellungen jederzeit ändern. Wenn Sie der Verwendung von Cookies zustimmen, klicken Sie bitte „Einverstanden“.",
    bannerAcceptLabel: "Einverstanden",
    bannerConfigureLabel: "Ändern",
    title: "Privatsphäre-Einstellungen",
    introText: "Bestimmen Sie selbst, mit welchen Cookie-Einstellungen Sie einverstanden sind.<br>Sie können Sie diese Einstellung jederzeit wieder ändern. Dies kann allerdings dazu führen, dass einzelne Funktionen nicht mehr zur Verfügung stehen. Zum Löschen der Cookies informieren Sie sich bitte in der Hilfefunktion Ihres Browsers.",
    privacyPageLabel: "Erfahren Sie mehr über unsere Cookies",
    categoriesTitle: "Ändern Sie Ihre Cookie-Einstellungen durch Klicken auf die einzelnen Kategorien",
    comparisonTitleAllowed: "Erlaubte Aktionen",
    comparisonTitleDisallowed: "Nicht erlaubte Aktionen",
    saveButtonLabel: "Speichern und schließen",
    saveDateLabel: "Privatsphäre-Einstellungen gespeichert am",
    necessaryLabel: "Notwendig",
    necessaryTexts: [
        "Notwendig: speichern Ihrer Cookie-Einstellungen",
        "Notwendig: Session Cookies",
        "Statisik: Anonymisierung der Statistikdaten",
    ],
    comfortLabel: "Komfort",
    comfortTexts: [
        "Komfort: speichern der Einstellungen für die Social-Media-Plugins",
    ],
    statisticLabel: "Statistik",
    statisticTexts: [
        "Statistik: Verbessern der Datenqualität für unsere Statistikauswertung",
    ],
    targetingLabel: "Targeting",
    targetingTexts: [
        "Targeting: Bereitstellen von Information und Werbung abhängig von Ihren Interessen bzw. von bisher besuchten Inhalten unserer Webseite.",
    ],
};


/**
 * @type {PrivacyManagerTranslationTexts}
 */
const ENGLISH_TEXTS = {
    bannerText: "This website uses cookies for reasons of functionality, convenience, and statistics. You can change this setting at any time by clicking on “Change settings.” If you consent to this use of cookies, please click “Yes, I agree.”",
    bannerAcceptLabel: "Yes, I agree",
    bannerConfigureLabel: "Change settings",
    title: "Privacy settings",
    introText: "Decide which cookies you want to allow.<br>You can change these settings at any time. However, this can result in some functions no longer being available. For information on deleting the cookies, please consult your browser’s help function.",
    privacyPageLabel: "Learn more about the cookies we use.",
    categoriesTitle: "You can enable or disable different types of cookies",
    comparisonTitleAllowed: "This website will",
    comparisonTitleDisallowed: "This website won't",
    saveButtonLabel: "Save and close",
    saveDateLabel: "Privacy settings saved on",
    necessaryLabel: "Necessary",
    necessaryTexts: [
        "Necessary: remember your cookie permission setting",
        "Necessary: allow session cookies",
        "Statistics: anonymization of statistical data",
    ],
    comfortLabel: "Convenience",
    comfortTexts: [
        "Convenience: remember social media settings",
    ],
    statisticLabel: "Statistics",
    statisticTexts: [
        "Statistics: increase the data quality of the statistics functions",
    ],
    targetingLabel: "Targeting",
    targetingTexts: [
        "Targeting: tailor information and advertising to your interests based on e.g. the content you have visited before.",
    ],
};


const TRANSLATIONS = {
    de: GERMAN_TEXTS,
    en: ENGLISH_TEXTS,
};


/**
 * @param {string} language
 * @return {PrivacyManagerTranslationTexts}
 */
export function getForLanguage (language)
{
    return TRANSLATIONS[language] || TRANSLATIONS["en"];
}
