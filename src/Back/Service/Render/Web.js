/**
 * @implements {TeqFw_Core_Shared_Api_Service}
 */
export default class Fl64_Tmpl_Back_Service_Render_Web {
    /* eslint-disable jsdoc/check-param-names */
    /* eslint-disable jsdoc/require-param-description */
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - Logger instance.
     * @param {Fl64_Tmpl_Back_Api_Adapter} adapter
     * @param {Fl64_Tmpl_Back_Service_Render} srvRender
     * @param {typeof Fl64_Tmpl_Back_Enum_Type} TMPL
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$: logger,
            Fl64_Tmpl_Back_Api_Adapter$: adapter,
            Fl64_Tmpl_Back_Service_Render$: srvRender,
            Fl64_Tmpl_Back_Enum_Type$: TMPL,
        }
    ) {
        // VARS

        // MAIN

        /**
         * Returns the result codes for the operation.
         * @return {typeof Fl64_Tmpl_Back_Service_Render_Web.RESULT}
         */
        this.getResultCodes = () => RESULT;

        /**
         * @param {object} params - Encapsulates input data for flexibility and backward compatibility.
         * @param {string} [params.pkg] - NPM package name (or null for app templates).
         * @param {string} params.name - Template name without extension.
         * @param {string} [params.localePkg] - Default locale for a teq-plugin (package).
         * @param {object} [params.view] - Base view data provided by the caller (plugin-level context).
         * @param {object} [params.partials] - Base partial templates provided by the caller.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} [params.req] - Incoming HTTP request.
         * @param {TeqFw_Db_Back_RDb_ITrans} [params.trx] - Optional database transaction context.
         * @returns {Promise<{resultCode: string, content: string|null}>}
         */
        this.perform = async function (
            {
                pkg,
                name,
                localePkg,
                view,
                partials,
                req,
                trx,
            }
        ) {
            let resultCode = RESULT.UNKNOWN_ERROR;
            let content = null;
            try {
                const context = await adapter.getWebContext({req, trx});
                const {content: rendered} = await srvRender.perform({
                    pkg,
                    type: TMPL.WEB,
                    name,
                    localeUser: context.locale.user,
                    localeApp: context.locale.app,
                    localePkg,
                    view: {...view, ...context.view},
                    partials: {...partials, ...context.partials},
                });
                content = rendered;
                resultCode = RESULT.SUCCESS;
            } catch (error) {
                logger.exception(error);
            }
            return {resultCode, content};
        };
    }
}

// VARS
/**
 * @memberOf Fl64_Tmpl_Back_Service_Render_Web
 */
const RESULT = {
    SUCCESS: 'SUCCESS',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};
Object.freeze(RESULT);