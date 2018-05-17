import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      uaCode: string,
 * }} GoogleAnalyticsOverTagManagerScript
 */

export class GoogleAnalyticsOverTagManagerLoader extends BaseScriptLoader
{
    /**
     * @param {GoogleAnalyticsOverTagManagerScript} config
     */
    load (config)
    {
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push(["js", new Date()]);
        window.dataLayer.push(["config", config.uaCode]);

        this.insertScriptTag(`https://www.googletagmanager.com/gtag/js?id=${config.uaCode}`);
    }
}
