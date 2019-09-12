module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({
      errors: true,
      msg: "Please log in "
    });
  }
};
