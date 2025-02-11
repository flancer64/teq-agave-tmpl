import Mustache from 'mustache';

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
         * @returns {Promise<{content: string|null}>}
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
                    }
                }
            } catch (error) {
                logger.exception(error);
            }
            return {content};
        };
    }
}
