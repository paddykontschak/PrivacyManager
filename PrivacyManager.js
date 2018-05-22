import { remove } from "mojave/dom/manipulate";
import { PrivacyManagerComponent } from "./Components/PrivacyManagerComponent";
import { PRIVACY_MANAGER_SCRIPT_LOADERS_MAP } from "./ScriptLoader";

export class PrivacyManager
{
    /**
     * @private
     * @type {Object.<string, function(config : Object) : void>}
     */
    scriptLoadersMap = PRIVACY_MANAGER_SCRIPT_LOADERS_MAP;

    /**
     * @private
     * @type {?HTMLElement}
     */
    parentContainer = null;

    /**
     * @private
     * @type {?PrivacyManagerConfig}
     */
    config;

    /**
     * @private
     * @type {PrivacyManagerTranslationTexts}
     */
    translationTexts;


    /**
     * @param {?HTMLElement} configDataElement
     * @param {PrivacyManagerTranslationTexts} translationTexts
     */
    constructor (configDataElement, translationTexts)
    {
        this.translationTexts = translationTexts;

        if (null === configDataElement)
        {
            return;
        }

        try
        {
            this.parentContainer = configDataElement.parentElement;
            this.config = JSON.parse(configDataElement.innerText);

            remove(configDataElement);
        }
        catch (err)
        {
            // Silently ignore errors
        }
    }

    /**
     * Initializes the PrivacyManager's functionality
     */
    init ()
    {
        if (null === this.config)
        {
            return;
        }

        this.privacyManager = new PrivacyManagerComponent(this.parentContainer, this.config, this.translationTexts);
        this.privacyManager.init()
            .then(() => this.onConsentConfigured());
    }


    /**
     * Opens the configuration dialog to change the privacy mode
     */
    manageConsent ()
    {
        if (null === this.config)
        {
            return;
        }

        this.privacyManager.manageConsent()
            // Reload the page to stop any active scripts from running in case the user lowers his privacy mode
            .then(() => window.location.reload());
    }


    /**
     * Callback
     *
     * @private
     */
    onConsentConfigured ()
    {
        const allowedScripts = this.privacyManager.getAllowedScripts();

        for (let index in allowedScripts)
        {
            if (!allowedScripts.hasOwnProperty(index))
            {
                continue;
            }

            const config = allowedScripts[index];
            const scriptLoader = this.scriptLoadersMap[config.type] || null;
            if (null !== scriptLoader)
            {
                scriptLoader(config);
            }
        }
    }
}
