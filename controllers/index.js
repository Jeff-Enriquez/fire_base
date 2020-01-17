const show = (req, res) => {
  res.render('index', {
    user: req.user
  });
}

module.exports = {
  show,
}