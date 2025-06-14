export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3000),
  app: {
    keys: env.array('APP_KEYS', ['Qa0zx1Cv', 'Ws9xc2Vb']),
  },
});