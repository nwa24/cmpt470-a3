const router = require('express').Router();

const rectangles = require('../controllers/rectangles');

// create a new rectangle
router.post('/', rectangles.create);

router.get('/', rectangles.findAll);

router.delete('/delete', rectangles.delete);

router.delete('/deleteAll', rectangles.deleteAll);

router.put('/update', rectangles.update);

module.exports = router;
