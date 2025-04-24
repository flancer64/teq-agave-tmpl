/**
 * Interface for an application-level adapter used by the template plugin.
 *
 * This interface is implemented by the application and used by other plugins to get
 * rendering context for email and web templates. It allows the application to override
 * or extend templates by providing centralized `view`, `partials`, and locale data.
 *
 * @interface
 */
export default class Fl64_Tmpl_Back_Api_Adapter {

    /* eslint-disable no-unused-vars */
    /**
     * Prepare a rendering context for an email template.
     *
     * @param {object} params - Parameters object.
     * @param {string} params.pkg - Package name of the template.
     * @param {string} params.tmpl - Template name (e.g., 'signup/confirm').
     * @param {number} [params.userId] - Optional user ID for personalized content.
     * @param {TeqFw_Db_Back_RDb_ITrans} [params.trx] - Optional DB transaction.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} [params.req] - Optional HTTP request for locale.
     * @returns {Promise<Fl64_Tmpl_Back_Dto_Context.Dto>}
     */
    async getEmailContext({pkg, tmpl, userId, trx, req}) {
        throw new Error('Cannot instantiate an interface');
    }

    /**
     * Prepare a rendering context for a web template.
     *
     * @param {object} params - Parameters object.
     * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} params.req - Incoming request.
     * @param {TeqFw_Db_Back_RDb_ITrans} [params.trx] - Optional DB transaction.
     * @returns {Promise<Fl64_Tmpl_Back_Dto_Context.Dto>}
     */
    async getWebContext({req, trx}) {
        throw new Error('Cannot instantiate an interface');
    }
}
