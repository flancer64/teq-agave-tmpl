/**
 * @implements {TeqFw_Core_Shared_Api_Action}
 */
export default class Fl64_Tmpl_Back_Act_FindTemplate {
    /* eslint-disable jsdoc/check-param-names */

    /* eslint-disable jsdoc/require-param-description */
    /**
     * @param {typeof import('node:fs')} fs
     * @param {typeof import('node:path')}  path
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Shared_Api_Logger} logger
     * @param {Fl64_Tmpl_Back_Dto_Locale} dtoLocale
     */
    constructor(
        {
            'node:fs': fs,
            'node:path': path,
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Fl64_Tmpl_Back_Dto_Locale$: dtoLocale,
        }
    ) {
        // VARS
        const {existsSync} = fs;
        const {join, normalize} = path;

        /** @type {string} */
        let ROOT_DIR;

        // FUNCS
        /**
         * Generates a list of unique locale variants, including both full (`xx-YY`) and short (`xx`) forms.
         *
         * @param {Fl64_Tmpl_Back_Dto_Locale.Dto} locale - List of locale values.
         * @returns {string[]} - Unique ordered list of locale variations.
         */
        function generateUniqueLocales(locale) {
            const variants = new Set();
            // Arrange the locales by priority
            const locales = [locale.user, locale.pkg, locale.app];
            for (const one of locales) {
                if (!one) {continue;}
                variants.add(one);
                if (one.includes('-')) {
                    variants.add(one.split('-')[0]);
                }
            }
            return [...variants];
        }

        /**
         * @returns {string}
         */
        function getRoot() {
            if (!ROOT_DIR) {ROOT_DIR = config.getPathToRoot();}
            return ROOT_DIR;
        }

        // MAIN
        /**
         * Finds the absolute path of the requested template file based on priority rules.
         *
         * @param {object} params
         * @param {string} params.name - The template name (including relative path and extension).
         * @param {string} params.type - The template type (`email`, `web`, `text`).
         * @param {string} [params.pkg] - The package name (`@vendor/pkg`) or empty for the application.
         * @param {Fl64_Tmpl_Back_Dto_Locale.Dto} [params.locale] - The locales.
         * @param {string} [params.localeUser] - (deprecated) User-defined locale.
         * @param {string} [params.localeApp] - (deprecated) Default application locale.
         * @param {string} [params.localePkg] - (deprecated) Default plugin locale.
         * @returns {Promise<{path: string|null}>} - The path to the found template or `null` if not found.
         */
        this.run = async function ({name, type, pkg, locale, localeUser, localeApp, localePkg}) {
            let path = null;
            const basePaths = [];
            const root = getRoot();
            if (!locale) {
                locale = dtoLocale.create();
                locale.app = localeApp;
                locale.pkg = localePkg;
                locale.user = localeUser;
            }
            const locales = generateUniqueLocales(locale);

            if (!pkg) {
                // Searching in the application template directory
                for (const locale of locales) {
                    basePaths.push(normalize(join(root, 'tmpl', type, locale, name)));
                }
                basePaths.push(normalize(join(root, 'tmpl', type, name))); // No locale fallback
            } else {
                // Searching in adapted templates (application overrides)
                for (const locale of locales) {
                    basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, locale, name)));
                }
                basePaths.push(normalize(join(root, 'tmpl', 'adapt', pkg, type, name))); // No locale fallback

                // Searching in the original plugin inside node_modules
                for (const locale of locales) {
                    basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, locale, name)));
                }
                basePaths.push(normalize(join(root, 'node_modules', pkg, 'tmpl', type, name))); // No locale fallback
            }

            for (const one of basePaths) {
                if (existsSync(one)) {
                    path = one;
                    break;
                }
            }
            if (!path) {
                logger.error(`Template '${name}' not found for type '${type}', pkg '${pkg || 'app'}', locales '${locales.join(', ')}'.`);
            }
            return {path};
        };
    }
}
