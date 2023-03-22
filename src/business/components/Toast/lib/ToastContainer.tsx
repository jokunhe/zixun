import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  EmitterSubscription
} from 'react-native'
const TOAST_MAX_WIDTH = 0.875
const TOAST_ANIMATION_DURATION = 200

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0
}

const durations = {
  LONG: 3500,
  SHORT: 2000
}

const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  containerStyle: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#000',
    opacity: 0.6,
    // borderRadius: 5,
    overflow: 'hidden'
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  }
})

type Props = {
  containerStyle?: object
  duration?: number
  visible?: boolean
  position?: number
  animation?: boolean
  shadow?: boolean
  keyboardAvoiding?: boolean
  backgroundColor?: string
  opacity?: number
  shadowColor?: string
  textColor?: string
  textStyle?: object
  delay?: number
  hideOnPress?: boolean
  onPress?: any
  onHide?: any
  onHidden?: any
  onShow?: any
  onShown?: any
  siblingManager?: any
  children?: any
}

type State = {
  visible: boolean | undefined
  opacity: Animated.Value
  windowWidth: number
  windowHeight: number
  keyboardScreenY: number
}

class ToastContainer extends Component<Props, State> {
  _showTimeout: any

  _animating: boolean

  _root: any

  _hideTimeout: any

  _keyboardHeight: number

  _keyboardListener!: EmitterSubscription

  _DimensionsListener!: EmitterSubscription

  static displayName = 'ToastContainer'

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: false,
    position: positions.BOTTOM,
    opacity: 0.8,
    delay: 0,
    hideOnPress: true,
    keyboardAvoiding: true
  }

  constructor(props: Props) {
    super(props)
    const window = Dimensions.get('window')
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0),
      windowWidth: window.width,
      windowHeight: window.height,
      keyboardScreenY: window.height
    }
    this._showTimeout = null
    this._animating = false
    this._root = null
    this._hideTimeout = null
    this._keyboardHeight = 0
  }

  UNSAFE_componentWillMount() {
    this._DimensionsListener = Dimensions.addEventListener('change', this._windowChanged)
    if (this.props.keyboardAvoiding) {
      this._keyboardListener = Keyboard.addListener(
        'keyboardDidChangeFrame',
        this._keyboardDidChangeFrame
      )
    }
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay)
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps: { visible: boolean | undefined }) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        clearTimeout(this._showTimeout)
        clearTimeout(this._hideTimeout)
        this._showTimeout = setTimeout(() => this._show(), this.props.delay)
      } else {
        this._hide()
      }

      this.setState({
        visible: nextProps.visible
      })
    }
  }

  componentWillUnmount = () => {
    this._hide()
    this._DimensionsListener && this._DimensionsListener.remove()
    this._keyboardListener && this._keyboardListener.remove()
  }

  _windowChanged = ({ window }: any) => {
    this.setState({
      windowWidth: window.width,
      windowHeight: window.height
    })
  }

  _keyboardDidChangeFrame = ({ endCoordinates }: any) => {
    this.setState({
      keyboardScreenY: endCoordinates.screenY
    })
  }

  _show = () => {
    clearTimeout(this._showTimeout)
    if (!this._animating) {
      clearTimeout(this._hideTimeout)
      this._animating = true
      this._root.setNativeProps({
        pointerEvents: 'auto'
      })
      this.props.onShow && this.props.onShow(this.props.siblingManager)
      Animated.timing(this.state.opacity, {
        // @ts-ignore
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false
      }).start(({ finished }: any) => {
        if (finished) {
          this._animating = !finished
          this.props.onShown && this.props.onShown(this.props.siblingManager)
          // @ts-ignore
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(() => this._hide(), this.props.duration)
          }
        }
      })
    }
  }

  _hide = () => {
    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)
    if (!this._animating) {
      if (this._root) {
        this._root.setNativeProps({
          pointerEvents: 'none'
        })
      }

      if (this.props.onHide) {
        this.props.onHide(this.props.siblingManager)
      }

      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished) {
          this._animating = false
          this.props.onHidden && this.props.onHidden(this.props.siblingManager)
        }
      })
    }
  }

  render() {
    const { props } = this
    const { windowWidth } = this.state
    const offset = props.position

    const { windowHeight, keyboardScreenY } = this.state
    const keyboardHeight = Math.max(windowHeight - keyboardScreenY, 0)
    const position = offset
      ? {
          [offset < 0 ? 'bottom' : 'top']: offset < 0 ? keyboardHeight - offset : offset
        }
      : {
          top: 0,
          bottom: keyboardHeight
        }

    return this.state.visible || this._animating ? (
      <View style={[styles.defaultStyle, position]} pointerEvents='auto'>
        <TouchableWithoutFeedback
          onPress={() => {
            typeof this.props.onPress === 'function' ? this.props.onPress() : null
            this.props.hideOnPress ? this._hide() : null
          }}
        >
          <Animated.View
            //@ts-ignore
            style={[
              styles.containerStyle,
              {
                marginHorizontal: windowWidth * ((1 - TOAST_MAX_WIDTH) / 2),
                maxWidth: windowWidth * TOAST_MAX_WIDTH
              },
              props.containerStyle,
              props.backgroundColor ? { backgroundColor: props.backgroundColor } : undefined,
              {
                opacity: this.state.opacity
              },
              props.shadow && styles.shadowStyle,
              props.shadowColor ? { shadowColor: props.shadowColor } : undefined
            ]}
            pointerEvents='none'
            ref={(ele: any) => (this._root = ele)}
          >
            {Object.prototype.toString.call(this.props.children) === '[object String]' ? (
              // @ts-ignore
              <Text
                style={[
                  styles.textStyle,
                  props.textStyle,
                  props.textColor && { color: props.textColor }
                ]}
              >
                {this.props.children}
              </Text>
            ) : (
              this.props.children
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    ) : null
  }
}

export default ToastContainer
export { positions, durations }
