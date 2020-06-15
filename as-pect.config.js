module.exports = {
  include: ["assembly/__tests__/**/*.spec.as.ts"],
  add: ["assembly/__tests__/**/*.include.ts"],
  flags: {
    "--debug": [],
    "--binaryFile": ["output.wasm"],
    "--runtime": ["stub"]
  },
  imports: {},
  disclude: [/node_modules/]
};
