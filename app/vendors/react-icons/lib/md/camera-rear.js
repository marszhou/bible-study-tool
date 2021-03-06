'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIconBase = require('react-icon-base');

var _reactIconBase2 = _interopRequireDefault(_reactIconBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MdCameraRear = function MdCameraRear(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm20 10c1.8 0 3.3-1.6 3.3-3.4s-1.5-3.2-3.3-3.2-3.4 1.4-3.4 3.2 1.5 3.4 3.4 3.4z m8.4-10c1.8 0 3.2 1.6 3.2 3.4v23.2c0 1.8-1.4 3.4-3.2 3.4h-11.8l5 5-5 5v-3.4h-8.2v-3.2h8.2v-3.4h-5c-1.8 0-3.2-1.6-3.2-3.4v-23.2c0-1.8 1.4-3.4 3.2-3.4h16.8z m-5 33.4h8.2v3.2h-8.2v-3.2z' })
        )
    );
};

exports.default = MdCameraRear;
module.exports = exports['default'];