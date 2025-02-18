const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // might have to take this out one day
      // project builds fine but
      // currently breaks vercel --prod
      // https://github.com/vercel/next.js/issues/75817
      optimize: { minify: false },
    },
  },
};
export default config;
