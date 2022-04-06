module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f1e104d228628d9421c51de4082697cf'),
  },
});
