import { BaseScriptLoader } from "./BaseScriptLoader";

/**
 * @typedef {{
 *      ?enableLinkTracking: boolean,
 *      ?trackPageView: boolean,
 *      trackerUrl: string,
 *      scriptUrl: string,
 *      siteId: number,
 * }} PiwikScript
 */

export class PiwikLoader extends BaseScriptLoader
{
    /**
     * @param {PiwikScript} config
     */
    load (config)
    {
        // eslint-disable
        window._paq = window._paq || [];

        if (typeof config.trackPageView !== "undefined" && config.trackPageView)
        {
            window._paq.push(["trackPageView"]);
        }

        if (typeof config.enableLinkTracking !== "undefined" && config.enableLinkTracking)
        {
            window._paq.push(["enableLinkTracking"]);
        }

        window._paq.push(["setTrackerUrl", config.trackerUrl]);
        window._paq.push(["setSiteId", config.siteId]);

        this.insertScriptTag(config.scriptUrl);
    }
}
