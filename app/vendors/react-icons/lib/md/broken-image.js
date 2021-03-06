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

var MdBrokenImage = function MdBrokenImage(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm30 19.1l5 5v7.5c0 1.8-1.6 3.4-3.4 3.4h-23.2c-1.8 0-3.4-1.6-3.4-3.4v-10.9l5 5 6.6-6.7 6.8 6.7z m5-10.7v10.9l-5-5-6.6 6.7-6.8-6.7-6.6 6.7-5-5.1v-7.5c0-1.8 1.6-3.4 3.4-3.4h23.2c1.8 0 3.4 1.6 3.4 3.4z' })
        )
    );
};

exports.default = MdBrokenImage;
module.exports = exports['default'];