export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', '0Ab0RMLKw8TyuWq2k1JJvkI31Q0IY6WNkV2PLacrz5c='),
    },
  },
});