import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, useWindowDimensions, Linking, ScrollView, TouchableNativeFeedback } from 'react-native'
import { useMount } from '@/hooks'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { NetGet, NetPost } from '@/business/utils/netWork';
import { inject, observer } from 'mobx-react';
import Toast from '@/business/components/Toast';
import { runInAction } from 'mobx';
import moment from 'moment';
import ModalPanel from '@/business/components/ModalPanel';
import WebView from 'react-native-webview'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/business/components/NavBar'
type Props = {
  navigation: any
  [key: string]: any
}
type State = {
  [key: string]: any
}

const Home = (props: Props) => {

  const insets = useSafeAreaInsets()
  const runFirst = `
  let selector = document.querySelector("div.styled__HeaderWrap-sc-1fya2ys-0")
  
  selector.style.display = "none"
     
        true; // note: this is required, or you'll sometimes get silent failures
      `;
  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', }}
    >

      <WebView injectedJavaScript={runFirst} source={{ uri: "https://www.guokr.com/" }} />
    </View>
  )
}
export default inject('basicSotre')(observer(Home))
