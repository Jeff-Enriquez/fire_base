const showIndex = (req, res) => {
  res.render('index');
}

const showBrowse = (req, res) => {
  res.render('browse/show');
}

const showMyAccount = (req, res) => {
  res.render('my-account/show');
}

const showMyStuff = (req, res) => {
  res.render('my-stuff/show');
}

module.exports = {
  showIndex,
  showBrowse,
  showMyAccount,
  showMyStuff,
}