/**
 * Usage:
 * import Dialog from '/components/Loading';
 * Single Button Style
 * Dialog.show({
 *   title: 'Title',
 *   desc: 'hello world',
 * });
 *
 * Double Button Style
 * Dialog.show({
 *   title: 'Title',
 *   desc: 'hello world',
 *   onPositivePress: () => alert('press positive button'),
 *   positiveText: 'confirm',
 *   onNegativePress: () => alert('press negative button'),
 *   negativeText: 'cancel'
 * });
 *
 * 注意：因为sibling库问题，Android端开发环境在多层路由下进行reload，会导致顶层的Dialog无法显示，重新进入一下路由即可正常显示
 */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  BackHandler,
  ViewStyle,
  Modal,
  Dimensions
} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import { Android, WINDOW_WIDTH } from '../DeviceInfo'

type onPositivePress = () => void
type onNegativePress = () => void

export enum LayoutDirection {
  LayoutHorizontal = 0,
  LayoutVertical
}

export enum ButtonSequence {
  PositiveFirst = 0,
  NegativeFirst
}

type Options = {
  title?: string
  desc?: string
  onPositivePress?: onPositivePress
  positiveText?: string
  onNegativePress?: onNegativePress
  negativeText?: string
  renderContent?: JSX.Element
  onRequestClose?: () => void
  layoutDirection?: LayoutDirection //默认按钮是左右布局
  buttonSequence?: ButtonSequence
  seperatorColor?: string
  descStyle?: TextStyle
  positiveStyle?: TextStyle
  positiveViewStyle?: ViewStyle
  negativeStyle?: TextStyle
  negativeViewStyle?: ViewStyle
  noListenReturnKey?: boolean
  containerStyle?: ViewStyle
  backgroundStyle?: ViewStyle
}

type Props = {
  title?: string
  desc?: string
  onPositivePress?: onPositivePress
  positiveText?: string
  onNegativePress?: onNegativePress
  negativeText?: string
  renderContent?: JSX.Element
  onRequestClose?: () => void
  layoutDirection?: LayoutDirection //默认按钮是左右布局
  buttonSequence?: ButtonSequence
  seperatorColor?: string
  descStyle?: TextStyle
  positiveStyle?: TextStyle
  positiveViewStyle?: ViewStyle
  negativeStyle?: TextStyle
  negativeViewStyle?: ViewStyle
  noListenReturnKey?: boolean
  containerStyle?: ViewStyle
  backgroundStyle?: ViewStyle
}

type State = {
  visible: boolean
}

export default class Dialog extends PureComponent<Props, State> {
  backHandlerListener: any

  static show(options: Options) {
    Dialog.dialogArr.push(
      new RootSiblings(
        (
          <Dialog
            ref={(comp: any) => {
              if (comp) {
                Dialog.refArr.push(comp)
              }
            }}
            key={'AKDialog'}
            {...options}
          />
        )
      )
    )
  }

  static dismiss() {
    if (Dialog.dialogArr.length >= 1) {
      const ref = this.refArr.pop()
      ref && ref.dismiss()
      // @ts-ignore
      const window = Dialog.dialogArr.pop()
      window && window.destroy()
    }
  }

  constructor(props: any) {
    super(props)
    this.state = {
      visible: true
    }
  }

  componentDidMount(): void {
    const { noListenReturnKey } = this.props
    if (Android && !noListenReturnKey) {
      this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  componentWillUnmount() {
    if (Android) {
      this.backHandlerListener && this.backHandlerListener.remove()
    }
  }

  static refArr: Array<any> = []

  static dialogArr: Array<RootSiblings> = []

  onBackPress = () => {
    this.onClose()
    return true
  }

  renderPositiveButton = () => {
    return (
      <TouchableOpacity
        key={'positive'}
        onPress={() => {
          this.onClose()
          this.props.onPositivePress && this.props.onPositivePress()
        }}
        style={[
          !!this.props.positiveViewStyle
            ? this.props.positiveViewStyle
            : {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50
            }
        ]}
      >
        <Text
          style={[
            { color: "#333", fontSize: 16 },
            this.props.positiveStyle
          ]}
        >
          {this.props.positiveText || 'Confirm'}
        </Text>
      </TouchableOpacity>
    )
  }

  renderNegativeButton = () => {
    return (
      <TouchableOpacity
        key={'negative'}
        onPress={() => {
          this.onClose()
          this.props.onNegativePress && this.props.onNegativePress()
        }}
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 50
          },
          this.props.negativeViewStyle
        ]}
      >
        <Text
          style={[
            { color: "#333", fontSize: 16, alignSelf: 'center' },
            this.props.negativeStyle
          ]}
        >
          {this.props.negativeText || 'Cancel'}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSeperatorLine = () => {
    return this.props.layoutDirection === LayoutDirection.LayoutVertical ? (
      <View
        key={'divider'}
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: this.props.seperatorColor || '#00000040'
        }}
      />
    ) : (
      <View
        key={'divider'}
        style={{
          width: StyleSheet.hairlineWidth,
          backgroundColor: this.props.seperatorColor || '#00000040'
        }}
      />
    )
  }

  renderButton = () => {
    // button配置
    let button: any = null
    if (
      (this.props.onPositivePress && this.props.onNegativePress) ||
      (this.props.positiveText && this.props.negativeText)
    ) {
      if (this.props.buttonSequence === ButtonSequence.PositiveFirst) {
        button = [
          this.renderPositiveButton(),
          this.renderSeperatorLine(),
          this.renderNegativeButton()
        ]
      } else {
        button = [
          this.renderNegativeButton(),
          this.renderSeperatorLine(),
          this.renderPositiveButton()
        ]
      }
    } else {
      if (this.props.positiveText || this.props.onPositivePress) {
        button = this.renderPositiveButton()
      } else {
        button = this.renderNegativeButton()
      }
    }
    return button
  }

  dismiss() {
    this.setState({
      visible: false
    })
  }

  onClose = () => {
    const { onRequestClose } = this.props
    Dialog.dismiss()
    onRequestClose && onRequestClose()
  }

  render() {
    if (!this.state.visible) return null
    let title: any = null

    //标题配置
    if (this.props.title) {
      title = <Text style={styles.title}>{this.props.title}</Text>
    }
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: 20,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(31, 31, 32, 0.4)'
        }}
      >
        <View style={[styles.modalContainer, this.props.backgroundStyle]}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={{ paddingHorizontal: 24, alignItems: 'center' }}>
              {title}
              {!!this.props.desc && (
                <Text style={[styles.desc, this.props.descStyle]}>{this.props.desc}</Text>
              )}
              {this.props.renderContent && <View>{this.props.renderContent}</View>}
            </View>
            <View
              style={
                this.props.layoutDirection === LayoutDirection.LayoutVertical
                  ? {
                    flexDirection: 'column',
                    marginTop: 16,
                    height:
                      (this.props.onPositivePress && this.props.onNegativePress) ||
                        (this.props.positiveText && this.props.negativeText)
                        ? 100
                        : 50,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: this.props.seperatorColor || '#00000040'
                  }
                  : {
                    flexDirection: 'row',
                    marginTop: 16,
                    height: 50,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderColor: this.props.seperatorColor || '#00000040'
                  }
              }
            >
              {this.renderButton()}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingTop: 36,
    width: WINDOW_WIDTH - 32,
    borderRadius: 18,
    backgroundColor: '#ffffff'
  },
  title: {
    color: '#000',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 23,
    textAlign: 'center'
  },
  desc: {
    color: '#858484',
    fontSize: 12,
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'left'
  }
})
