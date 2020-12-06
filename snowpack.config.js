/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
		// directory name: 'build directory'
		public: '/',
		src: '/_dist_',
  },
  plugins: [
		'@snowpack/plugin-svelte',
		'@snowpack/plugin-dotenv',
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
