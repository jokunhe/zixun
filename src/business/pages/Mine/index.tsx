import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, useWindowDimensions, Linking, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { useMount } from '@/hooks'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Image from 'react-native-fast-image'
import { NetPost } from '@/business/utils/netWork';
import Dialog from '@/business/components/Dialog';
import { DeleteData, StoreData } from '@/business/utils/cache';
import { runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
import serverUrl from '@/business/api';
type Props = {
  navigation: any
  [key: string]: any
}
type State = {
  [key: string]: any
}

const Mine = (props: Props) => {
  const { navigation, basicSotre } = props
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [money, setMoney] = useState("")
  const { basicSotre: {
    mineData, token
  } } = props
  useMount(() => {
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    });
    return unsubscribe;
  }, [navigation]);


  const getData = async () => {
    const res = await NetPost(serverUrl.memberInfo,
      {}, {
      headers: { Authorization: basicSotre.token }
    })
    if (res.code === "200") {
      runInAction(() => {
        props.basicSotre.mineData = res.data
      })
    }
  }


  // const tixian = async () => {

  //   const res = await NetPost(,
  //     {
  //       money
  //     }, {
  //     headers: { Authorization: token }
  //   })
  //   if (res.code === "200") {
  //     Dialog.show({
  //       title: "提现成功",
  //       positiveText: "确定"
  //     })
  //     setMoney("")
  //   }
  // }

  const logOut = () => {
    DeleteData("token")
    runInAction(() => {
      props.basicSotre.token = {}
    })
  }

  const headerIcon = !!mineData.avatar ? { uri: mineData.avatar } : require("@/business/images/logo.png")
  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 80 }}
    >
      <ImageBackground style={{ width: windowWidth - 32, height: (windowWidth - 32) * (129 / 328), justifyContent: "center", alignSelf: "center", marginVertical: 16 }} source={require("@/business/images/my_setting_icon.webp")} >
        <View style={{ flexDirection: "row", alignItems: "center" }} >
          <Image style={{ width: 80, height: 80, marginHorizontal: 16, borderRadius: 80 }} source={headerIcon} />
          <View>
            <Text style={{ marginBottom: 16, color: "#fff", fontSize: 16 }} >{mineData.nikename}</Text>
            <Text style={{ color: "#fff", fontSize: 16 }}>用户ID:{mineData.uid} </Text>
          </View>
        </View>
      </ImageBackground>
      <Text style={{ fontSize: 20, marginBottom: 18 }} >账户余额: </Text>
      <Text style={{ fontSize: 16, color: "#000" }} > <Text style={{ fontSize: 22, color: "#F9563C" }} >{mineData.balance}</Text>  商币(10个商币可以进行一次游戏)</Text>
      {/* <TextInput autoFocus={false} value={money} onChangeText={(value) => setMoney(value)} placeholder={'请输入提现金额'} clearButtonMode={'while-editing'} style={[styles.textInputStyle, { width: windowWidth * 0.9, }]} /> */}
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 40 }} >


        <TouchableOpacity onPress={logOut} style={{ borderRadius: 16, alignItems: "center", paddingVertical: 16, backgroundColor: "#F9563C", marginTop: 36 }} >
          <Text>退出登录</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity onPress={logOut} style={{ borderRadius: 16, alignItems: "center", paddingVertical: 16, marginBottom: 10 }} >
        <Text style={{ color: "#666" }} >退出登录</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  textInputStyle: {
    height: 38,
    backgroundColor: '#ddd',
    marginTop: 30,
    paddingLeft: 10,
    textAlign: 'left',
    borderRadius: 30,
  },
})

export default inject('basicSotre')(observer(Mine))
