import { append, createElement } from "mojave/dom/manipulate";
import { find, findOne } from "mojave/dom/traverse";

export const PRIVACY_MANAGER_SCRIPT_LOADERS_MAP = {
    albacross,
    facebookPixel,
    googleAds,
    googleAnalytics,
    googleAnalyticsOverTagManager,
    googleTagManager,
    googleRemarketing,
    hotJar,
    leadForensics,
    matelso,
    mouseFlow,
    piwik,
    wiredMinds,
};


/**
 * @param {string}src
 */
function insertScriptTag (src)
{
    const scriptElement = createElement("script", {
        src,
        async: true,
        defer: true,
    });

    append(document.body, scriptElement);
}


/**
 * @param {string} contents
 * @param {HTMLElement} parentContainer
 */
function insertDOMElement (contents, parentContainer = document.body)
{
    append(
        parentContainer,
        createElement(contents)
    );
}

/* eslint-disable */


/**
 * @param {{
 *      albacrossId: string,
 * }} config
 */
function albacross (config)
{
    window._nQc = config.albacrossId;
    insertScriptTag("https://serve.albacross.com/track.js");
}


/**
 * @param {{
 *      facebookPixelId: string,
 * }} config
 */
function facebookPixel (config)
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

    insertScriptTag("https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", config.facebookPixelId);
    window.fbq("track", "PageView");

    insertScriptTag(`<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${config.facebookPixelId}&ev=PageView&noscript=1"/></noscript>`);
}


/**
 * @param {{
 *      leadForensicsId: string,
 *      targetContainer: string,
 *      adClient: string,
 *      adSlot: string,
 * }} config
 */
function googleAds (config)
{
    const targetContainer = findOne(config.targetContainer);
    if (null === targetContainer)
    {
        return;
    }

    insertScriptTag(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`);
    insertDOMElement(
        `<ins class="adsbygoogle" data-ad-client="${config.adClient}" data-ad-slot="${config.adSlot}"></ins>`,
        targetContainer
    );
}


/**
 * @param {{
 *      uaCode: string,
 * }} config
 */
function googleAnalytics (config)
{
    window._paq = window._paq || [];

    window.ga = window.ga || function () {
        (window.ga.q = window.ga.q || []).push(arguments);
    };
    window.ga.l = 1 * new Date();
    window.GoogleAnalyticsObject = window.ga;

    insertScriptTag("https://www.google-analytics.com/analytics.js");

    window.ga("create", config.uaCode, "auto");
    window.ga("set", "anonymizeIp", true);
    window.ga("send", "pageview");
}


/**
 * @param {{
     *      uaCode: string,
     * }} config
 */
function googleAnalyticsOverTagManager (config)
{
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push(["js", new Date()]);
    window.dataLayer.push(["config", config.uaCode]);

    insertScriptTag(`https://www.googletagmanager.com/gtag/js?id=${config.uaCode}`);
}


/**
 * @param {{
 *      conversionId: number,
 *      customParams: Object,
 *      ?remarketingOnly: boolean,
 * }} config
 */
function googleRemarketing (config)
{
    window.google_tag_params = config.customParams;
    window.google_conversion_id = config.conversionId;

    if (typeof config.remarketingOnly !== "undefined" && config.remarketingOnly)
    {
        window.google_remarketing_only = true;
    }

    insertScriptTag("https://www.googleadservices.com/pagead/conversion.js");
    insertDOMElement(`
        <noscript>
            <div style="display:inline;">
                <img height="1" width="1" style="border-style:none;" alt="" src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/${config.conversionId}/?guid=ON&script=0"/>
            </div>
        </noscript>
    `);
}


/**
 * @param {{
 *      gtmCode: string,
 * }} config
 */
function googleTagManager (config)
{
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
    });

    insertScriptTag(`https://www.googletagmanager.com/gtm.js?id=${config.gtmCode}`);
    insertDOMElement(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtmCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
}


/**
 * @param {{
 *      hotJarId: string,
 * }} config
 */
function hotJar (config)
{
    window.hj = window.hj || function () {
        (window.hj.q = window.hj.q || []).push(arguments);
    };

    window._hjSettings = {
        hjid: config.hotJarId,
        hjsv: 6,
    };

    insertScriptTag(`https://static.hotjar.com/c/hotjar-${window._hjSettings.hjid}.js?svg=${window._hjSettings.hjsv}`);
}


/**
 * @param {{
 *      leadForensicsId: string,
 * }} config
 */
function leadForensics (config)
{
    insertScriptTag(`https://secure.leadforensics.com/js/${config.leadForensicsId}.js`);
    insertDOMElement(`<noscript><img src="https://secure.leadforensics.com/${config.leadForensicsId}.png" alt="" style="display:none;" /></noscript>`);
}


/**
 * @param {{
 *      poolId: string,
 *      phoneNumber: string,
 *      ?type: string,
 * }} config
 */
function matelso (config)
{
    window._nQc = config.albacrossId;
    insertScriptTag("https://serve.albacross.com/track.js");


    window.tn_pool_id = config.poolId;
    window.fallback_tn = config.phoneNumber;

    insertScriptTag(`https://rns.matelso.de/webtracking.js?tn_pool_id=${config.poolId}&type=${config.type || ""}`);

    if (typeof window.get_cookie !== "function")
    {
        find(".matelso-tracking").forEach(element => {
            element.innerHTML = window.fallback_tn;
            element.href = window.fallback_tn;
        });
    }
}


/**
 * @param {{
 *      mouseFlowId: string,
 * }} config
 */
function mouseFlow (config)
{
    window._mfq = window._mfq || [];

    insertScriptTag(`https://cdn.mouseflow.com/projects/${config.mouseFlowId}.js`);
}


/**
 * @param {{
 *      ?enableLinkTracking: boolean,
 *      ?trackPageView: boolean,
 *      trackerUrl: string,
 *      scriptUrl: string,
 *      siteId: number,
 * }} config
 */
function piwik (config)
{
    window._paq = window._paq || [];

    if (typeof config.trackPageView !== "undefined" && config.trackPageView)
    {
        window._paq.push(["trackPageView"]);
    }

    if (typeof config.enableLinkTracking !== "undefined" && config.enableLinkTracking)
    {
        window._paq.push(["enableLinkTracking"]);
    }

    window._paq.push(["setTrackerUrl", config.trackerUrl]);
    window._paq.push(["setSiteId", config.siteId]);

    insertScriptTag(config.scriptUrl);
}


/**
 * @param {{
 *      wiredMindsId: string,
 *      ?contentWidth: string,
 *      ?heatMap: boolean,
 * }} config
 */
function wiredMinds (config)
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

    insertScriptTag("https://wm.wiredminds.de/track/count.js");
    insertDOMElement(`
        <noscript>
            <div>
                <a target="_blank" href="http://www.wiredminds.de"><img src="http://wm.wiredminds.de/track/ctin.php?wm_custnum=${config.wiredMindsId}&nojs=1" alt="" border="0"></a>
            </div>
        </noscript>
    `);
}
