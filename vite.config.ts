// import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
// import { defineConfig } from "vite";
// import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router';
// import tsconfigPaths from "vite-tsconfig-paths";
//
//
// const sentryConfig: SentryReactRouterBuildOptions = {
//     org: "fredtech",
//     project: "travel-agency",
//     // An auth token is required for uploading source maps;
//     // store it in an environment variable to keep it secure.
//     authToken: process.env.SENTRY_AUTH_TOKEN,
//     // ...
// };

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
//     ssr: {
//       noExternal: [/@syncfusion/]
//     }
//     return {
//         plugins: [reactRouter(),sentryReactRouter(sentryConfig, config)],
//     };
// });

// export default defineConfig(config => {
//     return {
//         plugins: [tailwindcss(), tsconfigPaths(), reactRouter(), sentryReactRouter(sentryConfig, config)],
//         sentryConfig,
//         ssr: {
//             noExternal: [/@syncfusion/]
//         }
//     };
// });


// export default defineConfig(config => {
//     return {
//         plugins: [reactRouter(),sentryReactRouter(sentryConfig, config)],
//     };
// });


import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
    sentryReactRouter,
    type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
    org: "fredtech",
    project: "travel-agency",
    authToken: process.env.SENTRY_AUTH_TOKEN,
};

export default defineConfig((config) => ({
    plugins: [
        tailwindcss(),
        tsconfigPaths(), // enables "~" alias from tsconfig.json
        reactRouter(),
        sentryReactRouter(sentryConfig, config),
    ],

    ssr: {
        noExternal: [/@syncfusion/],
    },
}));
