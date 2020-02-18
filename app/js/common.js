(function () {
  'use strict';

  var slider = document.querySelector('.slider');
  var scale = slider.querySelector('.slider__scale');
  var pin = slider.querySelector('.slider__pin');
  var animationClass = 'slider__pin--transition';
  var scaleLeftCoordinate = scale.getBoundingClientRect().left;
  var scaleRightCoordinate = scale.getBoundingClientRect().right;
  var scaleWidth = scaleRightCoordinate - scaleLeftCoordinate;
  var pinWidth = pin.getBoundingClientRect().right - pin.getBoundingClientRect().left;
  var pinMidpoint = pinWidth / 2;
  var pinOffset = 2;
  var pinStartCoordinate = 0 - pinMidpoint + pinOffset;
  var pinEndCoordinate = scaleWidth - pinMidpoint - pinOffset;
  var pinSnapPoints = [pinStartCoordinate, 150 - pinMidpoint, 375 - pinMidpoint, pinEndCoordinate];
  var pinBreakpoints = [75 - pinMidpoint, 262 - pinMidpoint, 573 - pinMidpoint];

  var onPinClick = function onPinClick(evt) {
    evt.preventDefault();
    pin.classList.remove(animationClass);
    var pinXPosition = evt.clientX;
    var pinRelativePosition;

    var validateScaleBoundaries = function validateScaleBoundaries(pinPosition) {
      if (pinPosition < pinStartCoordinate) {
        return pinStartCoordinate;
      } else if (pinPosition > pinEndCoordinate) {
        return pinEndCoordinate;
      }

      return pinPosition;
    };

    var calculatePinPosition = function calculatePinPosition(moveEvt) {
      var currentX = moveEvt.clientX;
      var horizontalShift = pinXPosition - currentX;
      pinRelativePosition = validateScaleBoundaries(pin.offsetLeft - horizontalShift);
      pinXPosition = currentX;
    };

    var updatePin = function updatePin(position) {
      pin.style.left = "".concat(position, "px");
    };

    var snapPin = function snapPin() {
      var snapPoint;

      if (pinRelativePosition < pinBreakpoints[0]) {
        snapPoint = pinSnapPoints[0];
      } else if (pinRelativePosition >= pinBreakpoints[0] && pinRelativePosition < pinBreakpoints[1]) {
        snapPoint = pinSnapPoints[1];
      } else if (pinRelativePosition >= pinBreakpoints[1] && pinRelativePosition < pinBreakpoints[2]) {
        snapPoint = pinSnapPoints[2];
      } else {
        snapPoint = pinSnapPoints[3];
      }

      updatePin(snapPoint);
    };

    var onMouseMove = function onMouseMove(moveEvt) {
      calculatePinPosition(moveEvt);
      updatePin(pinRelativePosition);
    };

    var onMouseUp = function onMouseUp(upEvt) {
      upEvt.preventDefault();
      pin.classList.add(animationClass);
      snapPin();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var init$1 = function init() {
    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      onPinClick(evt);
    });
  };

  var slider$1 = {
    init: init$1
  };

  slider$1.init();

}());