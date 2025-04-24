/**
 * Helper for loading template files.
 *
 * @memberOf Fl64_Tmpl_Back_Helper
 */
export default class Fl64_Tmpl_Back_Helper {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {Fl64_Tmpl_Back_Act_FindTemplate} actFind - Action to resolve template path.
     * @param {Fl64_Tmpl_Back_Act_LoadTemplate} actLoad - Action to load template content.
     * @param {typeof Fl64_Tmpl_Back_Enum_Type} TYPE - Enum of template types.
     */
    constructor(
        {
            Fl64_Tmpl_Back_Act_FindTemplate$: actFind,
            Fl64_Tmpl_Back_Act_LoadTemplate$: actLoad,
            Fl64_Tmpl_Back_Enum_Type$: TYPE,
        }
    ) {
        /**
         * Load a web template based on the given parameters.
         *
         * @param {object} params - Parameters object.
         * @param {string} params.name - Template name including relative path and extension.
         * @param {string} [params.pkg] - NPM package name or null to use app-level templates.
         * @param {Fl64_Tmpl_Back_Dto_Locale.Dto} [params.locale] - Locale information used for template resolution.
         * @returns {Promise<{content: string|null}>} - Template content or null if not found.
         */
        this.loadTmplWeb = async function ({name, pkg, locale}) {
            const type = TYPE.WEB;
            const {path} = await actFind.run({name, type, pkg, locale});
            return await actLoad.run({path});
        };
    }
}
