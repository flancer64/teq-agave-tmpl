import {promises as fs} from 'fs';

/**
 * @implements {TeqFw_Core_Shared_Api_Action}
 */
export default class Fl64_Tmpl_Back_Act_LoadTemplate {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - Logger instance.
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$: logger,
        }
    ) {
        /**
         * Load the template file content.
         *
         * @param {Object} params
         * @param {string} params.path - Absolute or relative path to the template file.
         * @returns {Promise<{content: string|null}>}
         */
        this.run = async function ({path}) {
            let content = null;
            try {
                content = await fs.readFile(path, 'utf-8');
            } catch (error) {
                logger.error(`Failed to load template: ${path}`, error);
            }
            return {content};
        };
    }
}
