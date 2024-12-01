// [GET] /
module.exports.index = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("account/login");
  }
  res.send(`
    <h1>Profile</h1>
    <p>Username: ${req.user.username}</p>
    <p>Email: ${req.user.email}</p>
    <p>Role: ${req.user.role}</p>
    <a href="account/logout">Logout</a>
  `);
};
