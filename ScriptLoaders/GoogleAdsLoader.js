import { BaseScriptLoader } from "./BaseScriptLoader";
import { findOne } from "mojave/dom/traverse";
/* eslint-disable */

/**
 * @typedef {{
 *      leadForensicsId: string,
 *      targetContainer: string,
 *      adClient: string,
 *      adSlot: string,
 * }} GoogleAdsScript
 */

export class GoogleAdsLoader extends BaseScriptLoader
{
    /**
     * @param {GoogleAdsScript} config
     */
    load (config)
    {
        const targetContainer = findOne(config.targetContainer);
        if (null === targetContainer)
        {
            return;
        }

        this.insertScriptTag(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`);
        this.insertDOMElement(
            `<ins class="adsbygoogle" data-ad-client="${config.adClient}" data-ad-slot="${config.adSlot}"></ins>`,
            targetContainer
        );
    }
}
