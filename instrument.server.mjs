import * as Sentry from "@sentry/react-router";
Sentry.init({
    dsn: "https://abf94f82e952135170e1e6e1e6e45338@o4510376247033856.ingest.us.sentry.io/4510376265908224",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Recommended for React Router apps
    // tracesSampleRate: 1.0,
    // profilesSampleRate: 1.0,
});

// import * as Sentry from "@sentry/react-router/server";
//
// // --- SERVER-SIDE SENTRY INITIALIZATION ---
// Sentry.init({
//     dsn: "https://abf94f82e952135170e1e6e1e6e45338@o4510376247033856.ingest.us.sentry.io/4510376265908224",
//
//     // Enables capturing IP address + request headers
//     sendDefaultPii: true,
//
//     // Recommended for React Router apps
//     tracesSampleRate: 1.0,
//     profilesSampleRate: 1.0,
// });
