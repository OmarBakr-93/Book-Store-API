

const logger = (req, res, next) => {
  console.log(`Protocol: ${req.protocol} - Method: ${req.method} - ${req.get('host')} -${req.originalUrl}`);
  next();
};

module.exports = logger;