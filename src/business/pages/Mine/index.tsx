import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, useWindowDimensions, Linking, ImageBackground, StyleSheet, TextInput } from 'react-native'
import { useMount } from '@/hooks'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { NetPost } from '@/business/utils/netWork';
import Dialog from '@/business/components/Dialog';
import { DeleteData, StoreData } from '@/business/utils/cache';
import { runInAction } from 'mobx'
import { inject, observer } from 'mobx-react'
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
    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/memberInfo",
      {}, {
      headers: { Authorization: basicSotre.token }
    })
    if (res.code === "200") {
      runInAction(() => {
        props.basicSotre.mineData = res.data
      })
    }
  }


  const tixian = async () => {

    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/payout",
      {
        money
      }, {
      headers: { Authorization: token }
    })
    if (res.code === "200") {
      Dialog.show({
        title: "提现成功",
        positiveText: "确定"
      })
      setMoney("")
    }
  }
  const headerIcon = !!mineData.avatar ? { uri: mineData.avatar } : require("@/business/images/logo.png")
  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 }}
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
      <Text style={{ fontSize: 20, marginBottom: 8 }} >账户余额: </Text>
      <Text style={{ fontSize: 16, color: "#F9563C" }} >{mineData.balance}商币（{mineData.balance / 1000}元） </Text>
      <TextInput autoFocus={false} value={money} onChangeText={(value) => setMoney(value)} placeholder={'请输入提现金额'} clearButtonMode={'while-editing'} style={[styles.textInputStyle, { width: windowWidth * 0.9, }]} />

      <TouchableOpacity onPress={tixian} style={{ borderRadius: 16, alignItems: "center", paddingVertical: 16, backgroundColor: "#F9563C", marginTop: 36 }} >
        <Text>提现</Text>
      </TouchableOpacity>
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
