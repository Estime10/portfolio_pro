import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["__tests__/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "out"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: [
        "features/contact-screen/**/*.ts",
        "lib/config/formspree/**/*.ts",
        "lib/config/contact-form/**/*.ts",
        "lib/api/contact/**/*.ts",
        "lib/constants/publicContact.ts",
      ],
      exclude: ["__tests__/**", "**/types/**"],
    },
  },
});
