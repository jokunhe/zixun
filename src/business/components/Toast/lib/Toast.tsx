import React, { Component } from 'react'
import RootSiblings from 'react-native-root-siblings'
import ToastContainer, { positions, durations } from './ToastContainer'

class Toast extends Component {
  toastArr: any

  static show = (
    message: React.ReactNode,
    options: any = { position: positions.BOTTOM, duration: durations.SHORT }
  ) => {
    // return new RootSiblings(<ToastContainer
    if (!message) return
    Toast.toastArr.push(
      new RootSiblings(
        (
          <ToastContainer {...options} visible={true}>
            {message}
          </ToastContainer>
        )
      )
    )
    setTimeout(
      () => {
        Toast.hide && Toast.hide(Toast.toastArr.pop())
      },
      options.duration ? options.duration + 500 : durations.SHORT + 500
    )
    return Toast.toastArr[Toast.toastArr.length - 1]
  }

  static hide = (toast: any) => {
    if (toast instanceof RootSiblings) {
      toast.destroy()
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`
      )
    }
  }

  static displayName = 'Toast'

  // static propTypes = ToastContainer.propTypes;

  UNSAFE_componentWillMount = () => {
    this._toast = new RootSiblings(<ToastContainer {...this.props} duration={0} />)
  }

  UNSAFE_componentWillReceiveProps = (nextProps: any) => {
    this._toast.update(<ToastContainer {...nextProps} duration={0} />)
  }

  componentWillUnmount = () => {
    this._toast.destroy()
  }

  static positions = positions

  static durations = durations

  static toastArr: Array<RootSiblings> = []

  _toast: any = null

  render() {
    return null
  }
}

export { RootSiblings as Manager }
export default Toast
