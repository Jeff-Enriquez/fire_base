const show = (req, res) => {
  res.render('my-account/show', {
    user: req.user
  });
}

module.exports = {
  show,
}