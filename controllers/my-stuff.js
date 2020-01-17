const show = (req, res) => {
  res.render('my-stuff/show', {
    user: req.user
  });
}

module.exports = {
  show,
}