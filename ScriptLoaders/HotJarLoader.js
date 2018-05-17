import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      hotJarId: string,
 * }} HotJarScript
 */

export class HotJarLoader extends BaseScriptLoader
{
    /**
     * @param {HotJarScript} config
     */
    load (config)
    {
        window.hj = window.hj || function () {
            (window.hj.q = window.hj.q || []).push(arguments);
        };

        window._hjSettings = {
            hjid: config.hotJarId,
            hjsv: 6,
        };

        this.insertScriptTag(`https://static.hotjar.com/c/hotjar-${window._hjSettings.hjid}.js?svg=${window._hjSettings.hjsv}`);
    }
}
