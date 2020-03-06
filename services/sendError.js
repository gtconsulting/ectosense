function sendError(err, req, res, next) {
    if (typeof err === 'string') {
      return next(new Error(err));
    }
    if (typeof err === 'object') {
      if (err.stack !== undefined && err.message !== undefined) {
        return next(err);
      }
      res.status(err.status || 500);
      return res.json(err);
    }
    res.status(err.status || 500);
    return res.send(err);
}

module.exports = sendError;