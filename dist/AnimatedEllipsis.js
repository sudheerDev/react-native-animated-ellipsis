'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnimatedEllipsis extends _react.Component {

  constructor(props) {
    super(props);

    this._animation_state = {
      dot_opacities: this.initializeDots(),
      target_opacity: 1,
      should_animate: true
    };
  }

  initializeDots() {
    let opacities = [];

    for (let i = 0; i < this.props.numberOfDots; i++) {
      let dot = new _reactNative.Animated.Value(this.props.minOpacity);
      opacities.push(dot);
    }

    return opacities;
  }

  componentDidMount() {
    this.animate_dots.bind(this)(0);
  }

  componentWillUnmount() {
    this._animation_state.should_animate = false;
  }

  animate_dots(which_dot) {
    if (!this._animation_state.should_animate) return;

    // swap fade direction when we hit end of list
    if (which_dot >= this._animation_state.dot_opacities.length) {
      which_dot = 0;
      let min = this.props.minOpacity;
      this._animation_state.target_opacity = this._animation_state.target_opacity == min ? 1 : min;
    }

    let next_dot = which_dot + 1;

    _reactNative.Animated.timing(this._animation_state.dot_opacities[which_dot], {
      toValue: this._animation_state.target_opacity,
      duration: this.props.animationDelay
    }).start(this.animate_dots.bind(this, next_dot));
  }

  render() {
    let dots = this._animation_state.dot_opacities.map((o, i) => _react2.default.createElement(
      _reactNative.Animated.Text,
      { key: i, style: { opacity: o } },
      ' .'
    ));

    return _react2.default.createElement(
      _reactNative.Text,
      { style: this.props.style },
      dots
    );
  }
}
exports.default = AnimatedEllipsis;
AnimatedEllipsis.propTypes = {
  numberOfDots: _propTypes2.default.number,
  animationDelay: _propTypes2.default.number,
  minOpacity: _propTypes2.default.number,
  style: _reactNative.Text.propTypes.style
};
AnimatedEllipsis.defaultProps = {
  numberOfDots: 3,
  animationDelay: 300,
  minOpacity: 0,
  style: {
    color: '#aaa',
    fontSize: 32
  }
};