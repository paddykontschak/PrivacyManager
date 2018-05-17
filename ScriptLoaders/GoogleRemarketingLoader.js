import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      conversionId: number,
 *      customParams: Object,
 *      ?remarketingOnly: boolean,
 * }} GoogleRemarketingScript
 */

export class GoogleRemarketingLoader extends BaseScriptLoader
{
    /**
     * @param {GoogleRemarketingScript} config
     */
    load (config)
    {
        window.google_tag_params = config.customParams;
        window.google_conversion_id = config.conversionId;

        if (typeof config.remarketingOnly !== "undefined" && config.remarketingOnly)
        {
            window.google_remarketing_only = true;
        }

        this.insertScriptTag("https://www.googleadservices.com/pagead/conversion.js");
        this.insertDOMElement(`
            <noscript>
                <div style="display:inline;">
                    <img height="1" width="1" style="border-style:none;" alt="" src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/${config.conversionId}/?guid=ON&script=0"/>
                </div>
            </noscript>
        `);
    }
}
