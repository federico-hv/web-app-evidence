const { mergeConfig } = require("vite");
const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // HACK: can't use this because vite.config has .ts extension:
      // resolve: await await import('../vite.config.ts')).default.resolve,
      resolve: {
        alias: [
          {
            find: "hooks",
            replacement: path.resolve(__dirname, "./src/hooks")
          },
          {
            find: "utilities",
            replacement: path.resolve(__dirname, "./src/utilities")
          },
          { find: "lib", replacement: path.resolve(__dirname, "./src/lib") },
          {
            find: "pages",
            replacement: path.resolve(__dirname, "./src/pages")
          },
          {
            find: "contexts",
            replacement: path.resolve(__dirname, "./src/contexts")
          },
          {
            find: "configs",
            replacement: path.resolve(__dirname, "./src/configs")
          },
          {
            find: 'shared',
            replacement: path.resolve(__dirname, './src/shared'),
          },
          {
            find: "components",
            replacement: path.resolve(__dirname, "./src/components")
          }]
      }
    });
  }
};
