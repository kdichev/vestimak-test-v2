const config = {
  flags: {
    PARTIAL_HYDRATION: false,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};

export default config;
