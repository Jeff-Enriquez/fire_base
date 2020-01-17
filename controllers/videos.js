const show = (req, res) => {
  res.render('videos/show', {
    user: req.user
  });
}

module.exports = {
  show,
}