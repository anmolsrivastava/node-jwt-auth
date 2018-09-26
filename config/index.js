module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.HOST || 8000
    },
    database: {
        uri: `mongodb://${process.env.MONGODB_SERVICE_HOST || 'localhost'}:${process.env.MONGODB_SERVICE_PORT || '27017'}/${process.env.MONGO_DB_NAME || 'jwtauth'}`,
        options: {
          user: process.env.APP_DB_USER,
          pass: process.env.APP_DB_PASS,
          autoIndex: true,
          useNewUrlParser: true,
          dbName: process.env.MONGO_DB_NAME,
          poolSize: process.env.APP_DB_POOL_SIZE || 10,
          connectTimeoutMS: 5000
        }
      }
}