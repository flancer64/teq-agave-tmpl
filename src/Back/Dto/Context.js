/**
 * Represents the data transfer object (DTO) for template rendering context.
 *
 * @memberOf Fl64_Tmpl_Back_Dto_Context
 */
class Dto {
    /**
     * Locale settings DTO.
     *
     * @type {Fl64_Tmpl_Back_Dto_Locale.Dto}
     */
    locale;

    /**
     * Data for Mustache template rendering.
     *
     * @type {object}
     */
    view;

    /**
     * Partials for Mustache template rendering.
     *
     * @type {object}
     */
    partials;
}

/**
 * Factory class for creating instances of `Fl64_Tmpl_Back_Dto_Context.Dto`.
 * Provides type casting and basic validation.
 *
 * @implements TeqFw_Core_Shared_Api_Factory
 */
export default class Fl64_Tmpl_Back_Dto_Context {
    /* eslint-disable jsdoc/check-param-names */
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast - Utility for type conversion.
     * @param {Fl64_Tmpl_Back_Dto_Locale} dtoLocale - Factory for locale DTO.
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Fl64_Tmpl_Back_Dto_Locale$: dtoLocale,
        }
    ) {
        /**
         * Creates a new DTO instance with properly cast attributes.
         * Ensures valid types for all fields.
         *
         * @param {*} [data] - Raw input data for the DTO.
         * @returns {Dto} - A fully structured and type-safe DTO instance.
         */
        this.create = function (data) {
            const res = Object.assign(new Dto(), data);
            res.locale = dtoLocale.create(data?.locale);
            res.view = cast.object(data?.view);
            res.partials = cast.object(data?.partials);
            return res;
        };
    }
}