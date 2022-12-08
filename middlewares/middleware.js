const middleware = (req, res, next) => {
  console.log('Time', Date.now(), 'test');
  next()
}

module.exports = { middleware }