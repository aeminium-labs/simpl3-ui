/// <reference types="vitest" />

import path, { resolve } from "path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { peerDependencies, dependencies } from "./package.json";

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["src/**/*"],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src", "index.ts"),
            formats: ["es", "cjs"],
            fileName: (ext) => `index.${ext}.js`,
        },
        rollupOptions: {
            external: [
                ...Object.keys(peerDependencies),
                ...Object.keys(dependencies),
            ],
        },

        target: "esnext",
        sourcemap: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTests.ts",
    },
});
