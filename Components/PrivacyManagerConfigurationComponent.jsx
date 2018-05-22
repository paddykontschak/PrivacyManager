import { Component, h } from "preact";
import { formatDate } from "mojave/date/format";
import { classes as classNames } from "mojave/classes";
import { PRIVACY_MANAGER_MODE_NECESSARY, PRIVACY_MANAGER_MODE_COMFORT, PRIVACY_MANAGER_MODE_STATISTIC, PRIVACY_MANAGER_MODE_TARGETING } from "./PrivacyManagerComponent";


/**
 * @typedef {{
 *      savedUserSettings: PrivacyManagerUserSettings,
 *      config: PrivacyManagerConfig,
 *      texts: PrivacyManagerTranslationTexts,
 *      onSave: function(userSettings : PrivacyManagerUserSettings) : void,
 *      onClose: function() : void,
 * }} PrivacyManagerConfigurationComponentProps
 *
 * @typedef {{
 *      selectedModeIndex: number,
 * }} PrivacyManagerConfigurationComponentState
 */


export class PrivacyManagerConfigurationComponent extends Component
{
    /**
     * @private
     * @type {PrivacyManagerConfigurationComponentState}
     */
    state = {
        selectedModeIndex: 0,
    };

    /**
     * @private
     * @type {PrivacyManagerTranslationTexts}
     */
    texts;

    /**
     * @private
     * @type {Object.<number, string[]>}
     */
    allModeTexts;


    /**
     * @inheritDoc
     */
    constructor (props)
    {
        super(props);

        this.texts = props.texts;
        this.allModeTexts = {
            [PRIVACY_MANAGER_MODE_NECESSARY]: this.texts.necessaryTexts,
            [PRIVACY_MANAGER_MODE_COMFORT]: this.texts.comfortTexts,
            [PRIVACY_MANAGER_MODE_STATISTIC]: this.texts.statisticTexts,
            [PRIVACY_MANAGER_MODE_TARGETING]: this.texts.targetingTexts,
        };

        this.state.selectedModeIndex = props.savedUserSettings.modeIndex;
    }


    /**
     * @param {PrivacyManagerConfigurationComponentProps} props
     * @param {PrivacyManagerConfigurationComponentState} state
     *
     * @return {JSX.Element}
     */
    render (props, state)
    {
        const userSettings = props.savedUserSettings;

        return (
            <div class="privacy-manager-overlay">
                <div class="privacy-manager-dialog">
                    <button type="button" class="privacy-manager-close-button" onClick={() => props.onClose()}/>

                    <div class="privacy-manager-dialog-header">
                        <h2 class="privacy-manager-dialog-header-title">{this.texts.title}</h2>
                        <div class="content">
                            {/* eslint-disable-next-line react/no-danger */}
                            <p dangerouslySetInnerHTML={{__html: this.texts.introText}} />
                            {props.config.privacyPageUrl && (
                                <p>
                                    <a href={props.config.privacyPageUrl} class="privacy-manager-privacy-link">{this.texts.privacyPageLabel}</a>
                                </p>
                            )}
                        </div>
                    </div>
                    <div class="privacy-manager-dialog-configuration">
                        <h3 class="privacy-manager-dialog-configuration-title">{this.texts.categoriesTitle}</h3>

                        {this.renderCategoryModes(state.selectedModeIndex)}
                        {this.renderComparisonList(state.selectedModeIndex)}

                        {userSettings.timeCreated && (
                            <div class="privacy-manager-save-date-date">{this.texts.saveDateLabel}: {formatDate(userSettings.timeCreated)}</div>
                        )}

                        <button type="button" class="privacy-manager-save-button" onClick={() => this.onSave()}>{this.texts.saveButtonLabel}</button>
                    </div>
                </div>
            </div>
        );
    }


    /**
     * @private
     * @param {number} selectedModeIndex
     *
     * @returns {JSX.Element}
     */
    renderCategoryModes (selectedModeIndex)
    {
        return (
            <div class="privacy-manager-configurations">
                {this.renderCategoryModeButton(PRIVACY_MANAGER_MODE_NECESSARY, this.texts.necessaryLabel, selectedModeIndex)}
                {this.renderCategoryModeButton(PRIVACY_MANAGER_MODE_COMFORT, this.texts.comfortLabel, selectedModeIndex)}
                {this.renderCategoryModeButton(PRIVACY_MANAGER_MODE_STATISTIC, this.texts.statisticLabel, selectedModeIndex)}
                {this.renderCategoryModeButton(PRIVACY_MANAGER_MODE_TARGETING, this.texts.targetingLabel, selectedModeIndex)}
            </div>
        );
    }


    /**
     * @private
     * @param {number} mode
     * @param {string} label
     * @param {number} selectedModeIndex
     *
     * @return {JSX.Element}
     */
    renderCategoryModeButton (mode, label, selectedModeIndex)
    {
        const modeClasses = classNames({
            "privacy-manager-configuration-mode": true,
            "is-active": mode <= selectedModeIndex,
        });

        return (
            <button type="button" class={modeClasses} onClick={() => this.selectMode(mode)}>
                <span class="privacy-manager-action-icon">{this.getIconForCategory(mode)}</span>
                <span>{label}</span>
            </button>
        );
    }


    /**
     * @private
     * @param {number} category
     * @return {?JSX.Element}
     */
    getIconForCategory (category)
    {
        switch (category)
        {
            case PRIVACY_MANAGER_MODE_NECESSARY:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="41.7" height="54.9"><path d="M20.9 0L0 4v29.5c0 7.1 6.3 16.3 20.9 21.4 14.6-5.1 20.9-14.3 20.9-21.4V4L20.9 0zm18.6 33.5c0 6.2-5.8 14.4-18.7 19.1C8 47.8 2.2 39.6 2.2 33.5V5.8l18.7-3.6 18.7 3.6v27.7z"/><path d="M14.5 16.7L13 18.3l6.6 6.5-6.6 6.6 1.5 1.5 6.6-6.5 6.6 6.5 1.5-1.5-6.5-6.6 6.5-6.5-1.5-1.6-6.6 6.6z"/></svg>
                );
            case PRIVACY_MANAGER_MODE_COMFORT:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="46.9" height="46.9"><path d="M23.4 0C10.5 0 0 10.5 0 23.4c0 12.9 10.5 23.4 23.4 23.4 12.9 0 23.4-10.5 23.4-23.4C46.9 10.5 36.4 0 23.4 0zm0 44.9C11.6 44.9 2 35.3 2 23.4S11.6 2 23.4 2c11.8 0 21.5 9.6 21.5 21.5s-9.6 21.4-21.5 21.4z"/><path d="M35.6 28c-.5-.2-1.1 0-1.3.4-2.1 4.1-6.3 6.7-10.9 6.7-4.6 0-8.8-2.6-10.9-6.7-.2-.5-.8-.7-1.3-.4-.5.2-.7.8-.4 1.3 2.4 4.8 7.3 7.8 12.7 7.8 5.4 0 10.2-3 12.6-7.8.2-.5 0-1.1-.5-1.3zM16.6 21.5c1.6 0 2.9-1.3 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9s-2.9 1.3-2.9 2.9c-.1 1.6 1.3 2.9 2.9 2.9zM30.3 21.5c1.6 0 2.9-1.3 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9-1.6 0-2.9 1.3-2.9 2.9-.1 1.6 1.3 2.9 2.9 2.9z"/></svg>
                );
            case PRIVACY_MANAGER_MODE_STATISTIC:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="42.2" height="38.8"><path d="M40.5 16.9v20.2h-8.4V0h-1.7v37.1h-8.5V11.8h-1.6v25.3h-8.5V27h-1.7v10.1H1.7V21.9H0v16.9h42.2V16.9z"/></svg>
                );
            case PRIVACY_MANAGER_MODE_TARGETING:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="52.3" height="52.3"><path d="M.035 50.79L28.037 22.79l1.485 1.485L1.52 52.275zM20.1 15h8.6v2.1h-8.6zM43.7 15h8.6v2.1h-8.6zM35.1 23.6h2.1v8.6h-2.1zM35.1 0h2.1v8.6h-2.1zM40.8 10.02l6.08-6.08 1.485 1.484-6.08 6.081zM40.791 22.198l1.485-1.485 6.082 6.08-1.485 1.485zM24.097 5.489l1.485-1.485 6.08 6.08-1.484 1.486z"/></svg>
                );
            default:
                return null;
        }
    }

    /**
     * @private
     * @param {number} selectedModeIndex
     *
     * @returns {JSX.Element}
     */
    renderComparisonList (selectedModeIndex)
    {
        let allowedTexts = [];
        let disallowedTexts = [];

        for (let mode in this.allModeTexts)
        {
            if (!this.allModeTexts.hasOwnProperty(mode))
            {
                continue;
            }

            const modeTexts = this.allModeTexts[mode];

            if (mode <= selectedModeIndex)
            {
                allowedTexts = allowedTexts.concat(modeTexts);
            }
            else
            {
                disallowedTexts = disallowedTexts.concat(modeTexts);
            }
        }

        return (
            <div class="privacy-manager-dialog-configuration-comparison">
                <div class="privacy-manager-actions">
                    <h4 class="privacy-manager-action-title">{this.texts.comparisonTitleAllowed}</h4>
                    <ul class="privacy-manager-actions-allowed">
                        {allowedTexts.map(text => (
                            <li class="privacy-manager-action">
                                <span class="privacy-manager-action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.46 11.1"><path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M.62 6.61L4.57 9.7l7.1-9.08"/></svg>
                                </span>
                                <span dangerouslySetInnerHTML={{__html: text}}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="privacy-manager-actions">
                    <h4 class="privacy-manager-action-title">{this.texts.comparisonTitleDisallowed}</h4>
                    <ul class="privacy-manager-actions-disallowed">
                        {disallowedTexts.map(text => (
                            <li class="privacy-manager-action">
                                <span class="privacy-manager-action-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.47 13.19"><path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M.73 12.51L11.69.68M11.73 12.51L.73.68"/></svg>
                                </span>
                                <span dangerouslySetInnerHTML={{__html: text}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }


    /**
     * @private
     * @param {number} selectedModeIndex
     */
    selectMode (selectedModeIndex)
    {
        this.setState({
            selectedModeIndex,
        });
    }


    /**
     * @private
     */
    onSave ()
    {
        /** @type {PrivacyManagerConfigurationComponentProps} props */
        const props = this.props;
        /** @type {PrivacyManagerConfigurationComponentState} state */
        const state = this.state;

        props.onSave({
            modeIndex: state.selectedModeIndex,
            timeCreated: new Date(),
        });
    }
}
