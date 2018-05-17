import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      albacrossId: string,
 * }} AlbacrossScript
 */

export class AlbacrossLoader extends BaseScriptLoader
{
    /**
     * @param {AlbacrossScript} config
     */
    load (config)
    {
        window._nQc = config.albacrossId;
        this.insertScriptTag("https://serve.albacross.com/track.js");
    }
}
