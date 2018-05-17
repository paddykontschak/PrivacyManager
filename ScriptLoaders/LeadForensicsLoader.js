import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      leadForensicsId: string,
 * }} LeadForensicsScript
 */

export class LeadForensicsLoader extends BaseScriptLoader
{
    /**
     * @param {LeadForensicsScript} config
     */
    load (config)
    {
        this.insertScriptTag(`https://secure.leadforensics.com/js/${config.leadForensicsId}.js`);
        this.insertDOMElement(`<noscript><img src="https://secure.leadforensics.com/${config.leadForensicsId}.png" alt="" style="display:none;" /></noscript>`);
    }
}
