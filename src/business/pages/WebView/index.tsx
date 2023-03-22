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
  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', }}
    >
      <NavBar
        style={{ marginTop: insets.top }}
        navigation={props.navigation}
        title={props.route.params.title}
      />
      <WebView source={{ uri: props.route.params.url }} />
    </View>
  )
}
export default WebViewPage
