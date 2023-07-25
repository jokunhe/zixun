import React, { Component, useEffect, useState } from 'react'
import { Text, View, ScrollView, Animated, Alert, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import { useMount } from '@/hooks'
import { NetGet, NetPost } from '../../utils/netWork'
import WebView from 'react-native-webview'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NavBar from '@/business/components/NavBar'
type Props = {
  [key: string]: any
}
type State = {
  [key: string]: any
}

const WebViewPage = (props: Props) => {



  const insets = useSafeAreaInsets()
  const runFirst = `
  let selector = document.querySelector("div.ymwBootDownload")
  
  selector.style.display = "none"
     
        true; // note: this is required, or you'll sometimes get silent failures
      `;
  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', }}
    >
      <NavBar
        style={{ marginTop: insets.top }}
        navigation={props.navigation}
        title={props.route.params.title}
      />
      <WebView injectedJavaScript={runFirst} source={{ uri: props.route.params.url }} />
    </View>
  )
}
export default WebViewPage
