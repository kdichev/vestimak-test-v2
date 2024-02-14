const config = {
  flags: {
    PARTIAL_HYDRATION: process.env.PARTIAL_HYDRATION || false,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-transformer-remark`,
    // `gatsby-plugin-image`,
    // `gatsby-plugin-sharp`,
    // `gatsby-transformer-sharp`,
    `gatsby-plugin-no-sourcemaps`,
  ],
};

export default config;
