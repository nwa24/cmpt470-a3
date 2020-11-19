const db = require('../models');

const Rectangle = db.rectangles;

// create and save new rectangle
exports.create = (req, res) => {
  // request is already validated on the client side
  // create a rectangle
  const rectangle = {
    width: req.body.width,
    height: req.body.height,
    colour: req.body.colour,
    border_style: req.body.borderStyle,
    border_colour: req.body.borderColour,
  };

  // save rectangle to the database
  Rectangle.create(rectangle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while creating the rectangle.',
      });
    });
};

// retrieve all rectangles from the database
// can also retrieve all rectangles with a condition
exports.findAll = (req, res) => {
  Rectangle.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while retrieving all the rectangles.',
      });
    });
};

// update a rectangle by the id in the request
exports.update = (req, res) => {
  const id = req.body.rectangleId;
  const rectangle = {
    width: req.body.width,
    height: req.body.height,
    colour: req.body.colour,
    border_style: req.body.borderStyle,
    border_colour: req.body.borderColour,
  };

  Rectangle.update(rectangle, { where: { rectangle_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          id: id,
          rectangle: rectangle,
        });
      } else {
        res.send({
          message: `Cannot update rectangle with id=${id}. Maybe rectangle does not exist.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not update rectangle with id=${id}`,
      });
    });
};

// delete a rectangle by the id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Rectangle.destroy({ where: { rectangle_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send(id);
      } else {
        res.send({
          message: `Cannot delete rectangle with id=${id}. Maybe rectangle does not exist.`,
          id: id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete rectangle with id=${id}`,
      });
    });
};

// delete all rectnalges from the database
exports.deleteAll = (req, res) => {
  Rectangle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} rectangles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while deleting all rectangles.',
      });
    });
};
