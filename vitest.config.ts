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
        "features/contact/**/*.ts",
        "lib/config/emailjs/**/*.ts",
        "lib/constants/publicContact.ts",
      ],
      exclude: ["__tests__/**", "**/types/**"],
    },
  },
});
