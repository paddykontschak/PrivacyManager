import { BaseScriptLoader } from "./BaseScriptLoader";
/* eslint-disable */

/**
 * @typedef {{
 *      facebookPixelId: string,
 * }} FacebookPixelScript
 */

export class FacebookPixelLoader extends BaseScriptLoader
{
    /**
     * @param {FacebookPixelScript} config
     */
    load (config)
    {
        if (window.fbq)
        {
            return;
        }

        const wrapper = window.fbq = function ()
        {
            if (wrapper.callMethod)
            {
                wrapper.callMethod.apply(wrapper, arguments);
            }
            else
            {
                wrapper.queue.push(arguments);
            }
        };

        if (!window._fbq)
        {
            window._fbq = wrapper;
        }

        wrapper.push = wrapper;
        wrapper.loaded = !0;
        wrapper.version = '2.0';
        wrapper.queue = [];

        this.insertScriptTag("https://connect.facebook.net/en_US/fbevents.js");

        window.fbq("init", config.facebookPixelId);
        window.fbq("track", "PageView");

        this.insertScriptTag(`<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${config.facebookPixelId}&ev=PageView&noscript=1"/></noscript>`);
    }
}
