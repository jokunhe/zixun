import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Image,
  Animated,
  TextStyle
} from 'react-native'
import XNTextState from '../Text'
import { iOS, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT, WINDOW_WIDTH } from '../DeviceInfo'


interface NavBarProps {
  leftContent?: JSX.Element
  centerContent?: JSX.Element
  rightContent?: JSX.Element
  navigation: any
  title?: string
  leftText?: string
  hideLeft?: boolean
  fontColor?: string
  fontStyle?: TextStyle
  style?: ViewStyle
  onLeft?: () => void
  isAnimated?: boolean
}

const NavBar = (props: NavBarProps) => {
  const {
    leftContent = null,
    navigation = {},
    leftText = '',
    fontColor = '#333',
    onLeft,
    centerContent = null,
    title = '',
    rightContent = null,
    style = {},
    fontStyle = {},
    hideLeft = false,
    isAnimated = false
  } = props
  const NavBarView = isAnimated ? Animated.View : View

  const renderLeft = () => {
    const defaultContent = (
      <TouchableOpacity
        onPress={() => {
          if (onLeft) {
            onLeft()
          } else {
            navigation.pop()
          }
        }}
      >
        <View style={styles.leftDefault}>
          <Image style={styles.leftArrow} source={require('./img/arrow_left.png')} />
          {isAnimated ? (
            <Animated.Text style={[{ fontSize: 16, color: fontColor }, fontStyle]}>
              {leftText}
            </Animated.Text>
          ) : (
            <XNTextState color={fontColor} text={leftText} size={16} />
          )}
        </View>
      </TouchableOpacity>
    )
    return leftContent || defaultContent
  }

  const renderCenter = () => {
    const defaultContent = isAnimated ? (
      <Animated.Text numberOfLines={1} style={[{ fontSize: 16, color: fontColor }, fontStyle]}>
        {title}
      </Animated.Text>
    ) : (
      <XNTextState text={title} color={fontColor} size={17} numberOfLines={1} />
    )
    return centerContent || defaultContent
  }

  const renderRight = () => {
    return rightContent || null
  }
  return (
    <NavBarView style={[styles.container, style]}>
      <View style={styles.left}>{!hideLeft && renderLeft()}</View>

      <View style={styles.center}>{renderCenter()}</View>

      <View style={styles.right}>{renderRight()}</View>
    </NavBarView>
  )
}
export default NavBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: NAV_BAR_HEIGHT,
    width: WINDOW_WIDTH,
    backgroundColor: '#fff',
    paddingTop: iOS ? 0 : STATUS_BAR_HEIGHT
  },

  leftArrow: {
    width: 24,
    height: 24
  },

  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 70,
    paddingLeft: 15
  },

  leftDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },

  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: WINDOW_WIDTH - 70 * 2
  },

  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    width: 70,
    paddingRight: 15
  }
})
