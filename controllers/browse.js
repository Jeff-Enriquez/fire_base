const show = (req, res) => {
  res.render('browse/show', {
    user: req.user
  });
}

module.exports = {
  show,
}