import { BaseScriptLoader } from "./BaseScriptLoader";

/**
 * @typedef {{
 *      mouseFlowId: string,
 * }} MouseFlowScript
 */

export class MouseFlowLoader extends BaseScriptLoader
{
    /**
     * @param {MouseFlowScript} config
     */
    load (config)
    {
        window._mfq = window._mfq || [];

        this.insertScriptTag(`https://cdn.mouseflow.com/projects/${config.mouseFlowId}.js`);
    }
}
