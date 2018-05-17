import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      gtmCode: string,
 * }} GoogleTagManagerScript
 */

export class GoogleTagManagerLoader extends BaseScriptLoader
{
    /**
     * @param {GoogleTagManagerScript} config
     */
    load (config)
    {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
        });

        this.insertScriptTag(`https://www.googletagmanager.com/gtm.js?id=${config.gtmCode}`);
        this.insertDOMElement(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtmCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
    }
}
