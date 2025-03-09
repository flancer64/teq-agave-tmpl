import Mustache from 'mustache';

// VARS
/**
 * @memberOf Fl64_Tmpl_Back_Service_Render
 */
const RESULT = {
    SUCCESS: 'SUCCESS',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);

/**
 * @implements {TeqFw_Core_Shared_Api_Service}
 */
export default class Fl64_Tmpl_Back_Service_Render {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - Logger instance.
     * @param {Fl64_Tmpl_Back_Act_FindTemplate} actFind
     * @param {Fl64_Tmpl_Back_Act_LoadTemplate} actLoad
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$: logger,
            Fl64_Tmpl_Back_Act_FindTemplate$: actFind,
            Fl64_Tmpl_Back_Act_LoadTemplate$: actLoad,
        }
    ) {

        /**
         * Returns the result codes for the operation.
         * @return {typeof Fl64_Tmpl_Back_Service_Render.RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * Finds, loads, and renders a Mustache template.
         *
         * @param {Object} params
         * @param {string} [params.pkg] - NPM package name (or null for app templates).
         * @param {string} params.type - Template type ('web', 'email', etc.).
         * @param {string} params.name - Template name without extension.
         * @param {string} [params.localeUser] - User-defined locale.
         * @param {string} [params.localeApp] - Default application locale.
         * @param {string} [params.localePkg] - Default plugin locale.
         * @param {Object} [params.view] - Mustache template context.
         * @param {Object} [params.partials] - Mustache partial templates.
         * @returns {Promise<{resultCode: string, content: string|null}>}
         */
        this.perform = async function (
            {
                pkg,
                type,
                name,
                localeUser,
                localeApp,
                localePkg = 'en',
                view = {},
                partials = {}
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                // Find the template file path
                const {path} = await actFind.run({pkg, type, name, localeUser, localeApp, localePkg});
                if (path) {
                    // Load the template file content
                    const {content: templateContent} = await actLoad.run({path});
                    if (templateContent) {
                        // Render the template using Mustache
                        content = Mustache.render(templateContent, view, partials);
                        resultCode = RESULT.SUCCESS;
                    }
                }
            } catch (error) {
                logger.exception(error);
            }
            return {resultCode, content};
        };
    }
}
