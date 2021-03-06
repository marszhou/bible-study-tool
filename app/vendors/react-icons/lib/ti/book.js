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

var TiBook = function TiBook(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm30 5h-18.3c-0.5 0-0.9 0.2-1.2 0.5l-5 5c0 0-0.1 0.1-0.1 0.1-0.2 0.3-0.4 0.6-0.4 1 0 0 0 0.1 0 0.1v18.3c0 2.8 2.2 5 5 5h15c2.2 0 4-1.4 4.7-3.3h1.1c2.4 0 4.2-2.2 4.2-5v-16.7c0-2.8-2.2-5-5-5z m-20 26.7c-0.9 0-1.7-0.8-1.7-1.7v-16.7h3.4v18.4h-1.7z m16.7-1.7c0 0.9-0.8 1.7-1.7 1.7h-11.7v-18.4h11.7c0.9 0 1.7 0.8 1.7 1.7v15z m5-3.3c0 1-0.6 1.6-0.9 1.6h-0.8v-13.3c0-2.8-2.2-5-5-5h-14.3l1.7-1.7h17.6c0.9 0 1.7 0.8 1.7 1.7v16.7z' })
        )
    );
};

exports.default = TiBook;
module.exports = exports['default'];