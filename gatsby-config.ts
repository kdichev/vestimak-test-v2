const config = {
  graphqlTypegen: true,
  flags: {
    PARTIAL_HYDRATION: false,
  },
  plugins: ["gatsby-plugin-postcss", `gatsby-plugin-no-sourcemaps`],
};

export default config;
