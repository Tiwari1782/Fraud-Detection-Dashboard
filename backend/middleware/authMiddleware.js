exports.isAuthenticated = (req, res, next) => {
  if (req.session.adminId) {
    return next();
  }
  res.redirect('/auth/login');
};