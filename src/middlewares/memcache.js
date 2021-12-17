const memjs = require('memjs')
const memcached = memjs.Client.create()

const verifyCache = (req, res, next) => {
    memcached.get('home-page', (err, val) => {
      if (err) throw err;
      if (val !== null) {
        return res.status(200).json(JSON.parse(val));
      } else {
        return next();
      }
    });
};

module.exports = verifyCache;
