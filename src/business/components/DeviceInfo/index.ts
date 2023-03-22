import { Platform, Dimensions, StatusBar } from 'react-native'
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const iOS = Platform.OS === 'ios'
export const Android = Platform.OS === 'android'


// 顶部状态栏高度
export const STATUS_BAR_HEIGHT: any = Platform.select({
  android: StatusBar.currentHeight as number,
  ios: 44
})

export const NAV_BAR_HEIGHT = Platform.select({
  android: 44,
  ios: 44
})
