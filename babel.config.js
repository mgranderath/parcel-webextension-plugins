module.exports = {
  presets: [
    [
      require("@babel/preset-env"),
      {
        modules: false,
        targets: {
          node: 12,
        },
      },
    ],
  ],
  plugins: [
    [
      require("@babel/plugin-transform-modules-commonjs"),
      {
        lazy: () => process.env.NODE_ENV !== "test",
      },
    ],
  ],
};
