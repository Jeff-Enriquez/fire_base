const show = (req, res) => {
  res.render('videos/show', {
    user: req.user,
    id: req.params.id
  });
}
const newComment = (req, res) => {
  console.log(req);
}

module.exports = {
  show,
  new: newComment,
}