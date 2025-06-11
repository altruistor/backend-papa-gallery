export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ['Qa0zx1Cv', 'Ws9xc2Vb']),
  },
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', '0Ab0RMLKw8TyuWq2k1JJvkI31Q0IY6WNkV2PLacrz5c='),
    },
  },
});
