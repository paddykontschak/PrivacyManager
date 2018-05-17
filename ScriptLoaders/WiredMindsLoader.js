import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      wiredMindsId: string,
 *      ?contentWidth: string,
 *      ?heatMap: boolean,
 * }} WiredMindsScript
 */

export class WiredMindsLoader extends BaseScriptLoader
{
    /**
     * @param {WiredMindsScript} config
     */
    load (config)
    {
        window.wiredminds = [];
        window.wiredminds.push(["setTrackParam", "wm_custnum", config.wiredMindsId]);
        window.wiredminds.push(["setTrackParam", "wm_campaign_key", "utm_campaign"]);
        window.wiredminds.push(["count"]);

        if (typeof config.contentWidth !== "undefined" && config.contentWidth)
        {
            wiredminds.push(["setTrackParam", "wm_content_width", config.contentWidth]);
        }

        if (typeof config.heatMap !== "undefined" && config.heatMap)
        {
            window.wiredminds.push(["registerHeatmapEvent", "mousedown"]);
        }

        this.insertScriptTag("https://wm.wiredminds.de/track/count.js");
        this.insertDOMElement(`
            <noscript>
                <div>
                    <a target="_blank" href="http://www.wiredminds.de"><img src="http://wm.wiredminds.de/track/ctin.php?wm_custnum=__ID__&nojs=1" alt="" border="0"></a>
                </div>
            </noscript>
        `);
    }
}
