import { BaseScriptLoader } from "./BaseScriptLoader";
import { find } from "mojave/dom/traverse";
/* eslint-disable */

/**
 * @typedef {{
 *      poolId: string,
 *      phoneNumber: string,
 *      ?type: string,
 * }} MatelsoScript
 */

export class MatelsoLoader extends BaseScriptLoader
{
    /**
     * @param {MatelsoScript} config
     */
    load (config)
    {
        window._nQc = config.albacrossId;
        this.insertScriptTag("https://serve.albacross.com/track.js");


        window.tn_pool_id = config.poolId;
        window.fallback_tn = config.phoneNumber;

        this.insertScriptTag(`https://rns.matelso.de/webtracking.js?tn_pool_id=${config.poolId}&type=${config.type || ""}`);

        // eslint-disable
        if (typeof window.get_cookie !== "function")
        {
            find(".matelso-tracking").forEach(element => {
                element.innerHTML = window.fallback_tn;
                element.href = window.fallback_tn;
            });
        }
    }
}
