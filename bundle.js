require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-switch":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var events = {
	touch: {
		start: 'touchstart',
		stop: 'touchend',
		move: 'touchmove'
	},
	mouse: {
		start: 'mousedown',
		stop: 'mouseup'
	}
};

function preventScroll(e) {
	e.preventDefault();
}

var Switch = (function (_React$Component) {
	_inherits(Switch, _React$Component);

	function Switch(props) {
		_classCallCheck(this, Switch);

		_get(Object.getPrototypeOf(Switch.prototype), 'constructor', this).call(this, props);

		this.onSlideEnd = this.onSlideEnd.bind(this);
		this.onSlideStart = this.onSlideStart.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		var activeState = !!this.props.active ? true : false;
		this.state = { sliding: false, active: activeState };
	}

	_createClass(Switch, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener(events.touch.start, this.onSlideStart, false);
			document.addEventListener(events.mouse.start, this.onSlideStart, false);
			document.addEventListener(events.touch.stop, this.onSlideEnd, false);
			document.addEventListener(events.mouse.stop, this.onSlideEnd, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener(events.touch.start, this.onSlideStart, false);
			document.removeEventListener(events.mouse.start, this.onSlideStart, false);
			document.removeEventListener(events.touch.stop, this.onSlideEnd, false);
			document.removeEventListener(events.mouse.stop, this.onSlideEnd, false);
		}
	}, {
		key: 'onSlideEnd',
		value: function onSlideEnd() {
			if (this.state.sliding) {
				this.setState({ sliding: false, active: !this.state.active });

				var newState = !this.state.active;
				var callback = newState ? this.props.onActive : this.props.onInactive;
				callback && callback();

				// no longer prevent scrolling on mobile
				document.removeEventListener(events.touch.move, preventScroll, false);
			}
		}
	}, {
		key: 'onSlideStart',
		value: function onSlideStart(e) {
			if (e.target == this.refs.circle || e.target == this.refs['switch']) {
				this.setState({ sliding: true });

				// prevent scrolling on mobile
				document.addEventListener(events.touch.move, preventScroll, false);
			}
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave(e) {
			this.onSlideEnd(e);
		}
	}, {
		key: 'classes',
		value: function classes() {
			return (0, _classnames2['default'])('switch', { sliding: this.state.sliding }, { active: this.state.active }, { inactive: !this.state.active });
		}
	}, {
		key: 'switchStyles',
		value: function switchStyles() {
			var switchStyles = this.switchStylesProps();
			return merge({ borderRadius: switchStyles.width / 2 }, switchStyles);
		}
	}, {
		key: 'translationStyle',
		value: function translationStyle() {
			var circleStyles = this.circleStylesProps();
			var switchStyles = this.switchStyles();

			var offset = switchStyles.width - circleStyles.diameter;
			var translation = this.state.active ? offset : 0;

			if (this.state.sliding && this.state.active) {
				translation -= circleStyles.diameter / 2 + switchStyles.padding;
			}

			return {
				transform: 'translateX(' + translation + 'px)'
			};
		}
	}, {
		key: 'backgroundStyle',
		value: function backgroundStyle() {
			var circleStyles = this.circleStylesProps();
			var backgroundColor = this.state.active ? circleStyles.onColor : circleStyles.offColor;
			return { backgroundColor: backgroundColor };
		}
	}, {
		key: 'circleStylesProps',
		value: function circleStylesProps() {
			return merge(defaultCircleStyles, this.props.circleStyles);
		}
	}, {
		key: 'switchStylesProps',
		value: function switchStylesProps() {
			return merge(defaultSwitchStyles, this.props.switchStyles);
		}
	}, {
		key: 'circleDimensionsStyle',
		value: function circleDimensionsStyle() {
			var switchStyles = this.switchStyles();
			var circleStyles = this.circleStylesProps();
			var width = this.state.sliding ? circleStyles.diameter + circleStyles.diameter / 2 : circleStyles.diameter;
			return { width: width, height: circleStyles.diameter };
		}
	}, {
		key: 'circleStyles',
		value: function circleStyles() {
			return merge(this.circleDimensionsStyle(), this.backgroundStyle(), this.translationStyle(), this.circleStylesProps());
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'span',
				{ style: this.switchStyles(),
					className: this.classes(),
					ref: 'switch',
					onMouseLeave: this.onMouseLeave },
				_react2['default'].createElement('span', { style: this.circleStyles(), className: 'circle', ref: 'circle' })
			);
		}
	}]);

	return Switch;
})(_react2['default'].Component);

var defaultSwitchStyles = {
	width: 100,
	padding: 4,
	border: '1px solid #CFCFCF',
	display: 'inline-block',
	backgroundColor: 'white'
};

var defaultCircleStyles = {
	diameter: 35,
	borderRadius: 35,
	display: 'block',
	transition: 'transform 200ms, width 200ms, background-color 200ms',
	onColor: '#70D600',
	offColor: '#CFCFCF'
};

Switch.propTypes = {
	active: _react2['default'].PropTypes.bool,

	circleStyles: _react2['default'].PropTypes.shape({
		onColor: _react2['default'].PropTypes.string,
		offColor: _react2['default'].PropTypes.string,
		diameter: _react2['default'].PropTypes.number
	}),

	inactive: _react2['default'].PropTypes.bool,

	onActive: _react2['default'].PropTypes.func,
	onInactive: _react2['default'].PropTypes.func,

	switchStyles: _react2['default'].PropTypes.shape({
		width: _react2['default'].PropTypes.number
	})
};

Switch.defaultProps = {
	on: true,
	onInactive: function onInactive() {},
	onActive: function onActive() {},
	circleStyles: defaultCircleStyles,
	switchStyles: defaultSwitchStyles
};

function merge() {
	for (var _len = arguments.length, hashes = Array(_len), _key = 0; _key < _len; _key++) {
		hashes[_key] = arguments[_key];
	}

	return _extends.apply(undefined, [{}].concat(hashes));
}

exports['default'] = Switch;
module.exports = exports['default'];

},{"classnames":undefined,"react":undefined}]},{},[]);