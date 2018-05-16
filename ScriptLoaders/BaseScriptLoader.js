import { append, createElement } from "mojave/dom/manipulate";

/**
 * @typedef {{
 *      type: string,
 * }|*} PrivacyManagerScript
 */

export class BaseScriptLoader
{
    /**
     * Loads the given config
     *
     * @param {PrivacyManagerScript} config
     */
    load (config)
    {
    }


    /**
     * @protected
     *
     * @param {string}src
     */
    insertScriptTag (src)
    {
        const scriptElement = createElement("script", {
            src,
            async: true,
            defer: true,
        });

        append(document.body, scriptElement);
    }


    /**
     * @protected
     *
     * @param {string} contents
     * @param {HTMLElement} parentContainer
     */
    insertDOMElement (contents, parentContainer = document.body)
    {
        append(
            parentContainer,
            createElement(contents)
        );
    }
}
