/**
 * @implements {TeqFw_Core_Shared_Api_Action}
 */
export default class Fl64_Tmpl_Back_Act_LoadTemplate {
    /* eslint-disable jsdoc/check-param-names */
    /* eslint-disable jsdoc/require-param-description */
    /**
     * @param {typeof import('node:fs/promises')} fsPromises
     * @param {TeqFw_Core_Shared_Api_Logger} logger - Logger instance.
     */
    constructor(
        {
            'node:fs/promises': fsPromises,
            TeqFw_Core_Shared_Api_Logger$: logger,
        }
    ) {
        // VARS
        const {readFile} = fsPromises;

        // MAIN

        /**
         * Load the template file content.
         *
         * @param {object} params
         * @param {string} params.path - Absolute or relative path to the template file.
         * @returns {Promise<{content: string|null}>}
         */
        this.run = async function ({path}) {
            let content = null;
            try {
                content = await readFile(path, 'utf-8');
            } catch (error) {
                logger.error(`Failed to load template: ${path}`, error);
            }
            return {content};
        };
    }
}
