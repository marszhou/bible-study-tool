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

var MdScreenShare = function MdScreenShare(props) {
    return _react2.default.createElement(
        _reactIconBase2.default,
        _extends({ viewBox: '0 0 40 40' }, props),
        _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('path', { d: 'm21.6 24.1l6.8-6.2-6.8-6.3v3.6c-6.4 1-9 5.3-10 9.8 2.4-3.1 5.4-4.5 10-4.5v3.6z m11.8 5.9h6.6v3.4h-40v-3.4h6.6c-1.8 0-3.2-1.6-3.2-3.4v-16.6c0-1.9 1.4-3.4 3.2-3.4h26.8c1.8 0 3.2 1.5 3.2 3.4v16.6c0 1.8-1.4 3.4-3.2 3.4z' })
        )
    );
};

exports.default = MdScreenShare;
module.exports = exports['default'];