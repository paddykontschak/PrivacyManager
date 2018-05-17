import "mojave/polyfill/promise";
import { h, render } from "preact";
import { PrivacyManagerBannerComponent } from "./PrivacyManagerBannerComponent";
import { PrivacyManagerConfigurationComponent } from "./PrivacyManagerConfigurationComponent";
import { remove } from "mojave/dom/manipulate";
import { getCookie, setCookie } from "/Users/kaieichinger/Webserver/mojave/cookie.js";

/**
 * @typedef {{
 *      modeIndex: number,
 *      timeCreated: Date,
 * }} PrivacyManagerUserSettings
 *
 * @typedef {{
 *      privacyPageUrl: string,
 *      scripts: Object.<number, string[]>,
 * }} PrivacyManagerConfig
 */

const PRIVACY_MANAGER_STORAGE_KEY = "becklyn.privacy-manager.gdpr";

export const PRIVACY_MANAGER_MODE_NECESSARY = 0;
export const PRIVACY_MANAGER_MODE_COMFORT = 1;
export const PRIVACY_MANAGER_MODE_STATISTIC = 2;
export const PRIVACY_MANAGER_MODE_TARGETING = 3;

const DEFAULT_USER_SETTINGS = {
    modeIndex: PRIVACY_MANAGER_MODE_NECESSARY,
};


export class PrivacyManagerComponent
{
    /**
     * @private
     * @type {HTMLElement}
     */
    parentContainer;

    /**
     * @private
     * @type {PrivacyManagerConfig}
     */
    config;

    /**
     * @private
     * @type {PrivacyManagerTranslationTexts}
     */
    translationTexts;

    /**
     * @private
     * @type {boolean}
     */
    needsConsent = true;

    /**
     * @private
     * @type {?Element}
     */
    bannerComponent = null;

    /**
     * @private
     * @type {?Element}
     */
    configurationComponent = null;


    /**
     * @param {HTMLElement} parentContainer
     * @param {PrivacyManagerConfig} config
     * @param {PrivacyManagerTranslationTexts} translationTexts
     */
    constructor (parentContainer, config, translationTexts)
    {
        this.parentContainer = parentContainer;
        this.config = config;
        this.translationTexts = translationTexts;
    }


    /**
     * Returns a Promise that gets resolved as soon as the User has given his consent to any privacy mode.
     * If no consent has been given, a banner with a quick accept and a configure button
     * (that links to the configuration dialog) will be shown.
     *
     * @return {Promise}
     */
    init ()
    {
        return new Promise((resolve, reject) =>
        {
            if (null !== this.getUserSettings())
            {
                this.needsConsent = false;

                resolve();
                return;
            }

            const configurationProps = {
                savedUserSettings: DEFAULT_USER_SETTINGS,
                config: this.config,
                texts: this.translationTexts,
                onClose: () => this.closeConfigurationDialog(),
                onSave: (data) => {
                    this.saveUserSettings(data);
                    resolve();
                },
            };

            const bannerProps = {
                texts: this.translationTexts,
                onAccept: () => {
                    const defaultSettings = DEFAULT_USER_SETTINGS;
                    defaultSettings.timeCreated = new Date();

                    this.saveUserSettings(defaultSettings);
                    resolve();
                },
                onConfigure: () => this.showConfigurationDialog(configurationProps),
            };

            this.bannerComponent = render(
                <PrivacyManagerBannerComponent {...bannerProps} />,
                this.parentContainer
            );
        });
    }


    /**
     * Allows the user to reconfigure his privacy configuration.
     * If no previous consent has been given, only the configuration dialog will be shown.
     *
     * @return {Promise}
     */
    manageConsent ()
    {
        this.closeConfigurationDialog();

        return new Promise((resolve, reject) =>
        {
            const userSettings = this.getUserSettings() || DEFAULT_USER_SETTINGS;

            const configurationProps = {
                savedUserSettings: userSettings,
                config: this.config,
                texts: this.translationTexts,
                onClose: () => this.closeConfigurationDialog(),
                onSave: (data) => {
                    this.saveUserSettings(data);
                    resolve();
                },
            };

            this.showConfigurationDialog(configurationProps);
        });
    }



    /**
     * Renders the configuration dialog
     *
     * @private
     * @param {PrivacyManagerConfigurationComponentProps} configurationProps
     */
    showConfigurationDialog (configurationProps)
    {
        this.configurationComponent = render(
            <PrivacyManagerConfigurationComponent {...configurationProps} />,
            this.parentContainer
        );
    }


    /**
     * Closes the info banner
     *
     * @private
     */
    closeBanner ()
    {
        if (null !== this.bannerComponent)
        {
            remove(this.bannerComponent);

            this.bannerComponent = null;
        }
    }


    /**
     * Closes the configuration dialog
     *
     * @private
     */
    closeConfigurationDialog ()
    {
        if (null !== this.configurationComponent)
        {
            remove(this.configurationComponent);

            this.configurationComponent = null;
        }
    }


    /**
     * @private
     * @return {?PrivacyManagerUserSettings}
     */
    getUserSettings ()
    {
        return getCookie(PRIVACY_MANAGER_STORAGE_KEY);
    }


    /**
     * @private
     * @param {PrivacyManagerUserSettings} settings
     */
    saveUserSettings (settings)
    {
        setCookie(PRIVACY_MANAGER_STORAGE_KEY, settings, {
            expires: 30,
        });

        this.closeBanner();
        this.closeConfigurationDialog();
    }


    /**
     * Determines whether or not the user has configured any privacy mode
     *
     * @return {boolean}
     */
    hasConsent ()
    {
        return !this.needsConsent;
    }


    /**
     * Determines whether or not the user has opted into the comfort category
     *
     * @return {boolean}
     */
    hasAllowedComfortMode ()
    {
        const settings = this.getUserSettings();

        return null !== settings && settings.modeIndex >= PRIVACY_MANAGER_MODE_COMFORT;
    }


    /**
     * Determines whether or not the user has opted into the statistic category
     *
     * @return {boolean}
     */
    hasAllowedStatisticMode ()
    {
        const settings = this.getUserSettings();

        return null !== settings && settings.modeIndex >= PRIVACY_MANAGER_MODE_STATISTIC;
    }


    /**
     * Determines whether or not the user has opted into the targeting category
     *
     * @return {boolean}
     */
    hasAllowedTargetingMode ()
    {
        const settings = this.getUserSettings();

        return null !== settings && settings.modeIndex >= PRIVACY_MANAGER_MODE_TARGETING;
    }


    /**
     * Returns all scripts that are allowed for the current user's privacy level
     *
     * @return {string[]}
     */
    getAllowedScripts ()
    {
        if (!this.hasConsent())
        {
            return [];
        }

        let scripts = [];
        const userSettings = this.getUserSettings();

        for (let mode in this.config.scripts)
        {
            if (!this.config.scripts.hasOwnProperty(mode))
            {
                continue;
            }

            if (mode <= userSettings.modeIndex)
            {
                scripts = scripts.concat(this.config.scripts[mode]);
            }
        }

        return scripts;
    }
}
