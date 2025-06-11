export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'z8cUcK6tj0UpXTiA6bUIeQ=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', '0J0BJKqH8Rwzzh4jRf3Qqw=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'JcM5Y0nw9mLu3OPH8UyUEw=='),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', '6IwS2LWU/veJs1/xkyH4QA=='),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
