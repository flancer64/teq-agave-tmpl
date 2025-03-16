/**
 * Interface for adapting this plugin into an application.
 *
 * This is a documentation-only interface (not executable).
 *
 * @interface
 */
export default class Fl64_Tmpl_Back_Api_Adapter {

    /**
     * Extracts locale preferences from the HTTP request.
     *
     * @param {Object} params - Input parameters.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} params.req - The HTTP request object.
     * @returns {Promise<{localeUser:string, localeApp:string}>} -
     *          An object containing extracted locales:
     *          - `localeUser`: Preferred locale extracted from the `Accept-Language` header.
     *          - `localeApp`: Default application locale, usually configured globally.
     */
    async getLocales({req}) {
        throw new Error('Cannot instantiate an interface');
    }

}
