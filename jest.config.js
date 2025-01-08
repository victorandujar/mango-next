// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/.setupTests.ts"],

  testEnvironment: "jest-environment-jsdom",

  preset: "ts-jest",

  clearMocks: true,

  collectCoverageFrom: [
    "src/app/**/*.ts",
    "src/app/**/*.tsx",
    "!next.config.js",
    "!next-env.d.ts",
    "!src/app/components/Providers/Providers.tsx",
    "!src/app/[locale]/layout.tsx",
    "!src/app/interfaces/interfaces.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
