/**
 * Usage:
 * import Loading from '@/components/Loading';
 * Loading.show(option?:object);
 * Loading.dismiss();
 */

import React, { PureComponent } from 'react'
import { View, StyleSheet, Animated, Easing, ImageBackground, Image, Modal, Text } from 'react-native'
import CustomText from '../Text'
import RootSiblings from 'react-native-root-siblings'

interface Props {
  title?: string
  isLabel?: boolean
}

interface options {
  title?: string
}

interface State {
  visible: boolean
}

export default class Loading extends PureComponent<Props, State> {
  rotateAnimation: any

  roatateValue: Animated.Value

  static show(options?: options) {
    Loading.lodingArr.push(
      new RootSiblings(
        (
          <Loading
            ref={(comp: any) => {
              if (comp) {
                Loading.refArr.push(comp)
              }
            }}
            key={'Loading'}
            {...options}
          />
        )
      )
    )
  }

  static dismiss() {
    if (Loading.lodingArr.length >= 1) {
      const ref = this.refArr.pop()
      ref && ref.dismiss()
      // @ts-ignore
      const window = Loading.lodingArr.pop()
      window && window.destroy()
    }
  }

  constructor(props: Props) {
    super(props)
    this.roatateValue = new Animated.Value(0)
    this.rotateAnimation = Animated.timing(this.roatateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    })
    this.state = { visible: true }
  }

  componentDidMount(): void {
    this.rotate()
  }

  componentWillUnmount(): void {
    this.rotateAnimation.stop()
  }

  static refArr: Array<any> = []

  static lodingArr: Array<RootSiblings> = []

  rotate = () => {
    this.roatateValue.setValue(0)
    this.rotateAnimation.start(() => this.rotate())
  }

  dismiss() {
    this.setState({
      visible: false
    })
  }

  render() {
    const { isLabel, title } = this.props
    //映射 0-1的值 映射 成 0 - 360 度
    const spin = this.roatateValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ['0deg', '360deg'] //输出值
    })
    if (isLabel) {
      return (
        <View pointerEvents={'box-only'} style={styles.labelContainer}>
          <Animated.Image
            source={require('./images/loading.webp')}
            style={[
              styles.loading,
              {
                transform: [
                  {
                    rotate: spin
                  }
                ]
              }
            ]}
          />
        </View>
      )
    } else {
      return (
        <Modal
          supportedOrientations={['portrait', 'landscape-right']}
          transparent
          visible={this.state.visible}
          animationType='fade'
        >
          <View style={styles.modal} pointerEvents={'box-only'}>
            <View style={styles.container}>
              <View style={styles.labelContainer}>
                <Animated.Image
                  source={require('./images/loading.webp')}
                  style={[
                    styles.loading,
                    {
                      transform: [
                        {
                          rotate: spin
                        }
                      ]
                    }
                  ]}
                />
              </View>
              {!!title && (
                <Text style={styles.title} >链接中</Text>
              )}
            </View>
          </View>
        </Modal>
      )
    }
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5
  },
  labelContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: 40,
    height: 40
  },
  loadingIcon: {
    position: 'absolute',
    width: 22,
    height: 22
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    color: "#333"
  }
})
