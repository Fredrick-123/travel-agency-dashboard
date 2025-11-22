import { PassThrough } from "node:stream";
import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";

import * as Sentry from "@sentry/react-router";
import { getMetaTagTransformer } from "@sentry/react-router";

// ----------------------
// 1. Initialize Sentry
// ----------------------
// Sentry.init({
//     dsn: process.env.SENTRY_DSN,
//     tracesSampleRate: 1.0,
//
//     integrations: [
//         Sentry.reactRouterV7BrowserTracingIntegration({
//             useEffect: true,
//             useLocation: true,
//             useNavigationType: true,
//             useMatches: true,
//         }),
//     ],
// });

export const streamTimeout = 5000;

// ----------------------
// 2. handleRequest (SSR)
// ----------------------
function handleRequest(
    request: Request,
    status: number,
    headers: Headers,
    routerContext: EntryContext,
    loadContext: AppLoadContext,
) {
    if (request.method === "HEAD") {
        return new Response(null, { status, headers });
    }

    return new Promise((resolve, reject) => {
        let shellRendered = false;
        const ua = request.headers.get("user-agent");

        const readyEvent =
            (ua && isbot(ua)) || routerContext.isSpaMode
                ? "onAllReady"
                : "onShellReady";

        let timeoutId: NodeJS.Timeout | undefined = setTimeout(() => {
            abort();
        }, streamTimeout + 1000);

        const { pipe, abort } = renderToPipeableStream(
            <ServerRouter context={routerContext} url={request.url} />,
            {
                // Signal when the shell or full content is ready
                [readyEvent]() {
                    shellRendered = true;

                    const rawBody = new PassThrough({
                        final(cb) {
                            clearTimeout(timeoutId);
                            timeoutId = undefined;
                            cb();
                        },
                    });

                    // 3. Inject Sentry meta tags
                    const transformed = getMetaTagTransformer(rawBody);

                    const stream = createReadableStreamFromReadable(transformed);
                    headers.set("Content-Type", "text/html");

                    // 🚀 Correct Sentry-compliant piping (ONLY ONCE)
                    pipe(transformed);

                    resolve(new Response(stream, { status, headers }));
                },

                onShellError(error) {
                    reject(error);
                },

                // 4. Forward streaming errors to Sentry
                onError(error) {
                    status = 500;
                    if (shellRendered) {
                        console.error(error);
                    }
                    Sentry.captureException(error);
                },
            }
        );
    });
}

// ----------------------
// 5. Export with Sentry wrapper
// ----------------------
// @ts-ignore
export default Sentry.wrapSentryHandleRequest(handleRequest);

// ----------------------
// 6. Error handler
// ----------------------
export const handleError = Sentry.createSentryHandleError({
    logErrors: false,
});

