import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      uaCode: string,
 * }} GoogleAnalyticsScript
 */

export class GoogleAnalyticsLoader extends BaseScriptLoader
{
    /**
     * @param {GoogleAnalyticsScript} config
     */
    load (config)
    {
        // eslint-disable
        window._paq = window._paq || [];

        window.ga = window.ga || function () {
            (window.ga.q = window.ga.q || []).push(arguments);
        };
        window.ga.l = 1 * new Date();
        window.GoogleAnalyticsObject = window.ga;

        this.insertScriptTag("https://www.google-analytics.com/analytics.js");

        window.ga("create", config.uaCode, "auto");
        window.ga("set", "anonymizeIp", true);
        window.ga("send", "pageview");
    }
}
