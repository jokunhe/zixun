import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

type XNTextType = {
  size?: number
  color?: string
  text?: string
  style?: TextStyle
} & TextProps

type XNTextState = {
  text: any
}

class XNText extends PureComponent<XNTextType, XNTextState> {
  _text: any

  static defaultProps: XNTextType = {
    size: 20,
    color: '#fff',
    allowFontScaling: false
  }

  constructor(props: XNTextType) {
    super(props)
    this.state = {
      text: props.text ? props.text : props.children
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: XNTextType) {
    this.setState({ text: nextProps.text ? nextProps.text : nextProps.children })
  }

  // setText = (text: string) => {
  //   this.setState({ text })
  // }

  // setNativeProps = (nativeProps: any) => {
  //   this._text.setNativeProps(nativeProps)
  // }

  render() {
    const { style, size, color, ...props } = this.props
    const { fontSize, color: styleColor } = StyleSheet.flatten([style as TextStyle])
    const realSize = fontSize || size
    const realColor = styleColor || color
    return (
      <Text
        style={[style, { fontSize: realSize, color: realColor }]}
        ref={(ref) => {
          this._text = ref
        }}
        allowFontScaling={false}
        {...props}
      >
        {this.state.text}
      </Text>
    )
  }
}
export default XNText
