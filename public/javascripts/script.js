// on load of the script
// load all the rectangles that are in the database onto the page
$(document).ready(function () {
  axios
    .get('/rectangles', {})
    .then((res) => {
      res.data.forEach((rectangle) => {
        addRectangleToPage(rectangle);
      });
    })
    .catch((err) => {
      $(`<p class="errorMessage">${err}<p>`).insertBefore('#displayRectangles');
    });
});

function addRectangle() {
  // get values from the form
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;
  const colour = document.getElementById('colour').value;
  const borderStyle = document.getElementById('borderStyle').value;
  const borderColour = document.getElementById('borderColour').value;

  // make a POST request
  axios
    .post('/rectangles', {
      width: width,
      height: height,
      colour: colour,
      borderStyle: borderStyle,
      borderColour: borderColour,
    })
    .then((res) => {
      addRectangleToPage(res.data);
    })
    .catch((err) => {
      $(`<p class="errorMessage">${err}<p>`).insertBefore('#displayRectangles');
    });
  $('.addRectangle').trigger('reset');
}

function deleteRectangle() {
  const rectangleID = document.getElementById('deleteRectangleId').value;
  axios
    .delete('/rectangles/delete', { data: { id: rectangleID } })
    .then((res) => {
      if (res.data.message) {
        $(`<p class="errorMessage">${res.data.message}<p>`).insertBefore(
          '#displayRectangles'
        );
      } else {
        $(`#${res.data}`).remove();
      }
    })
    .catch((err) => {
      $(`<p class="errorMessage">${err}<p>`).insertBefore('#displayRectangles');
    });
  $('.deleteRectangle').trigger('reset');
}

function deleteAllRectangles() {
  axios
    .delete('/rectangles/deleteAll')
    .then((res) => {
      // remove all child elements under displayRectangles element
      $('#displayRectangles').empty();
      alert(res.data.message);
    })
    .catch((err) => {
      $(`<p class="errorMessage">${err}<p>`).insertBefore('#displayRectangles');
    });
  $('.deleteRectangle').trigger('reset');
}

function updateRectangle() {
  const rectangleID = document.getElementById('updateRectangleId').value;
  const width = document.getElementById('updateRectangleWidth').value;
  const height = document.getElementById('updateRectangleHeight').value;
  const colour = document.getElementById('updateRectangleColour').value;
  const borderStyle = document.getElementById('updateRectangleBorderStyle')
    .value;
  const borderColour = document.getElementById('updateRectangleBorderColour')
    .value;

  axios
    .put('/rectangles/update', {
      rectangleId: rectangleID,
      width: width,
      height: height,
      colour: colour,
      borderStyle: borderStyle,
      borderColour: borderColour,
    })
    .then((res) => {
      if (res.data.message) {
        $(`<p class="errorMessage">${res.data.message}<p>`).insertBefore(
          '#displayRectangles'
        );
      } else {
        const id = res.data.id;
        const {
          width,
          height,
          colour,
          border_style,
          border_colour,
        } = res.data.rectangle;
        const rectangle = {
          rectangle_id: id,
          width: width,
          height: height,
          colour: colour,
          borderStyle: border_style,
          borderColour: border_colour,
        };
        document.getElementById(id).remove();
        addRectangleToPage(rectangle);
      }
    })
    .catch((err) => {
      $(`<p class="errorMessage">${err}<p>`).insertBefore('#displayRectangles');
    });
  $('.updateRectangle').trigger('reset');
}

function addRectangleToPage(rectangle) {
  const rectangleElement = createRectangleElement(rectangle);
  const rectangleId = createIdText(rectangle);
  const rectangleArea = createAreaText(rectangle);
  const rectanglePerimeter = createPerimeterText(rectangle);

  const div = document.createElement('div');
  div.id = rectangle.rectangle_id;
  div.classList.add('rectangleContainer');

  div.append(rectangleId);
  div.append(rectangleArea);
  div.append(rectanglePerimeter);
  div.append(rectangleElement);

  $('#displayRectangles').append(div);
}

function createRectangleElement(rectangle) {
  const div = document.createElement('div');
  div.style.width = `${rectangle.width}px`;
  div.style.height = `${rectangle.height}px`;
  div.style.backgroundColor = rectangle.colour;
  div.style.borderStyle = rectangle.border_style;
  div.style.borderColor = rectangle.border_colour;
  return div;
}

function createAreaText(rectangle) {
  const areaText = document.createElement('p');
  const area = rectangle.width * rectangle.height;
  areaText.innerHTML = `Area: ${area.toString()}`;
  areaText.id = 'area';
  return areaText;
}

function createIdText(rectangle) {
  const idText = document.createElement('p');
  idText.innerHTML = `ID: ${rectangle.rectangle_id}`;
  idText.id = 'id';
  return idText;
}

function createPerimeterText(rectangle) {
  const perimeterText = document.createElement('p');
  const perimeter = 2 * (Number(rectangle.width) + Number(rectangle.height));
  perimeterText.innerHTML = `Perimeter: ${perimeter.toString()}`;
  perimeterText.id = 'perimeter';
  return perimeterText;
}
