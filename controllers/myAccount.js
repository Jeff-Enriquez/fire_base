const show = (req, res) => {
  res.render('myAccount/show', {
    user: req.user
  });
}

module.exports = {
  show,
}