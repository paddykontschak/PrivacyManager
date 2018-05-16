import { Component, h } from "preact";


/**
 * @typedef {{
 *      texts: PrivacyManagerTranslationTexts,
 *      onAccept: function() : void,
 *      onConfigure: function() : void,
 * }} PrivacyManagerBannerComponentProps
 */

export class PrivacyManagerBannerComponent extends Component
{
    /**
     * @param {PrivacyManagerBannerComponentProps} props
     *
     * @return {JSX.Element}
     */
    render (props)
    {
        const texts = props.texts;

        return (
            <div class="privacy-manager-banner">
                <div class="privacy-manager-banner-content">
                    <div class="privacy-manager-banner-text content" dangerouslySetInnerHTML={{__html: texts.bannerText}} />
                    <div class="privacy-manager-banner-actions">
                        <button type="button" class="privacy-manager-banner-button" onClick={() => props.onAccept()}>{texts.bannerAcceptLabel}</button>
                        <button type="button" class="privacy-manager-banner-button" onClick={() => props.onConfigure()}>{texts.bannerConfigureLabel}</button>
                    </div>
                </div>
            </div>
        );
    }
}
