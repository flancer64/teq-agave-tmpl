/**
 * Represents the data transfer object (DTO) for template locale data.
 *
 * @memberOf Fl64_Tmpl_Back_Dto_Locale
 */
class Dto {
    /**
     * The default application locale.
     *
     * @type {string}
     */
    app;

    /**
     * The default package locale.
     *
     * @type {string}
     */
    pkg;

    /**
     * The locale requested by the user.
     *
     * @type {string}
     */
    user;
}

/**
 * Factory class for creating instances of `Fl64_Tmpl_Back_Dto_Locale.Dto`.
 * Provides type casting and basic validation.
 *
 * @implements TeqFw_Core_Shared_Api_Factory
 */
export default class Fl64_Tmpl_Back_Dto_Locale {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast - Utility for type conversion.
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * Creates a new DTO instance with properly cast attributes.
         * Ensures valid types for locale fields.
         *
         * @param {*} [data] - Raw input data for the DTO.
         * @returns {Dto} - A fully structured and type-safe DTO instance.
         */
        this.create = function (data) {
            const res = Object.assign(new Dto(), data);
            res.user = cast.string(data?.user);
            res.app = cast.string(data?.app);
            res.pkg = cast.string(data?.pkg);
            return res;
        };
    }
}