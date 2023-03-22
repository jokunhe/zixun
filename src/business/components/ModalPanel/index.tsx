/**
 * Usage
 * ModalPanel.show({
 *   childrenComponent:React.ReactElement
 * });
 *
 * 注意：因为sibling库问题，Android端开发环境在多层路由下进行reload，会导致顶层的ModalPanel无法显示，重新进入一下页面即可正常显示
 */

import React, { Component } from 'react'
import { Android } from '../DeviceInfo'
import { BackHandler, View } from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import _ from 'lodash'
import Modal, { ReactNativeModal } from 'react-native-modal'
interface Props {
  onClose?: () => void
  customContainerStyle?: object
  customStyle?: object
  childrenComponent: React.ReactElement
}

interface State {
  visible: boolean
}

interface Options {
  onClose?: () => void
  childrenComponent: React.ReactElement
}

export default class ModalPanel extends Component<Props, State> {
  showAni: any

  backHandlerListener: any

  static dismiss() {
    if (ModalPanel.ModalPanelArr.length >= 1) {
      const ref = ModalPanel.ModalPanelRefArr.pop()
      ref && ref.dismiss()
      // @ts-ignore
      const window = ModalPanel.ModalPanelArr.pop()
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
    if (Android) {
      this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
  }

  componentWillUnmount() {
    if (Android) {
      this.backHandlerListener.remove()
    }
  }

  static show = _.debounce(
    (options: Options) => {
      ModalPanel.ModalPanelArr.push(
        new RootSiblings(
          (
            <ModalPanel
              ref={(comp: any) => {
                if (comp) {
                  ModalPanel.ModalPanelRefArr.push(comp)
                }
              }}
              {...options}
            />
          )
        )
      )
    },
    500,
    { leading: true, trailing: false }
  )

  static ModalPanelArr: Array<RootSiblings> = []

  static ModalPanelRefArr: Array<any> = []

  onBackPress = () => {
    this.onClose()
    return true
  }

  dismiss() {
    this.setState({
      visible: false
    })
  }

  onClose = () => {
    const { onClose } = this.props
    ModalPanel.dismiss()
    onClose && onClose()
  }

  render() {
    const { childrenComponent } = this.props
    if (!this.state.visible) return null
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
        <ReactNativeModal
          backdropColor='transparent'
          animationIn='fadeIn'
          style={{ justifyContent: 'center', alignItems: 'center' }}
          isVisible={this.state.visible}
          onBackdropPress={() => {
            ModalPanel.dismiss()
          }}
          onBackButtonPress={() => {
            ModalPanel.dismiss()
          }}
        >
          {childrenComponent}
        </ReactNativeModal>
      </View>
    )
  }
}
