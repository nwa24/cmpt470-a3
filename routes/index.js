const path = require('path');
const router = require('express').Router();

// GET home page
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;
