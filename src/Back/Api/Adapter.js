/**
 * Interface for implementing an application-level adapter for this plugin.
 *
 * @interface
 */
export default class Fl64_Tmpl_Back_Api_Adapter {

    /**
     * @param {object} params - Encapsulates input data for flexibility and backward compatibility.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} params.req - Incoming HTTP request.
     * @returns {Promise<{localeUser: string, localeApp: string}>}
     */
    async getLocales({req}) {
        throw new Error('Cannot instantiate an interface');
    };

    /* eslint-disable no-unused-vars */
    /**
     * Build a rendering context for web templates.
     *
     * @param {object} params - Encapsulates input data for flexibility and backward compatibility.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} params.req - Incoming HTTP request.
     * @param {TeqFw_Db_Back_RDb_ITrans} [params.trx] - Optional database transaction.
     * @returns {Promise<Fl64_Tmpl_Back_Dto_Context.Dto>} - Structured rendering context.
     */
    async getWebContext({req, trx}) {
        throw new Error('Cannot instantiate an interface');
    }
}
