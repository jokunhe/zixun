import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, TouchableOpacity, useWindowDimensions, Linking, ScrollView, TouchableNativeFeedback } from 'react-native'
import { useMount } from '@/hooks'
import Image from 'react-native-fast-image'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { NetGet, NetPost } from '@/business/utils/netWork';
import { inject, observer } from 'mobx-react';
import Toast from '@/business/components/Toast';
import { runInAction } from 'mobx';
import moment from 'moment';
import ModalPanel from '@/business/components/ModalPanel';

type Props = {
  navigation: any
  [key: string]: any
}
type State = {
  [key: string]: any
}

const Home = (props: Props) => {
  const [data, setData] = useState<any[]>([])
  const [redPacket, setRedPacket] = useState<any[]>([])
  const [swiperData, setSwiperData] = useState<any[]>([])
  const { navigation, basicSotre } = props
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const { basicSotre: {
    mineData
  } } = props
  useMount(() => {
    getData()
    getSwiperData()
    getRedPacket()
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRedPacket()
      getMineData()
    });
    return unsubscribe;
  }, [navigation]);


  const getMineData = async () => {
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

  const toGame = () => {
    if (mineData.balance < 10) {
      Toast.show(('商币不够10个，不能进行游戏'), {
        duration: 200,
        position: 0
      })
      return
    }
    let num = retrunNum()
    subtractBalance()
    navigation.navigate("WebViewPage", { url: `http://game.nfxuanniao.cn/yxmb/${num}/index.html`, title: "Game" })
  }

  const subtractBalance = async () => {
    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/subtractBalance", {}, {
      headers: { Authorization: basicSotre.token }
    })
  }

  const retrunNum = () => {
    return Math.round(Math.random() * 80)
  }

  const getSwiperData = async () => {
    const res = await NetGet("http://xn-ad.nfxuanniao.cn/api/ad/banner/list/public?groupId=1001")
    console.log(res);

    setSwiperData(res.rows)
  }

  const getRedPacket = async () => {
    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/adRedPacket/list",
      { "adCode": "HOME_VIDEO_AD" }, {
      headers: { Authorization: basicSotre.token }
    })


    setRedPacket(res.data.list)
  }

  const getData = async () => {
    const res = await NetPost("https://apis.tianapi.com/game/index?key=eba365daef4428b83930f8b7d927003f&num=50")
    setData(res.result.newslist)
  }

  const goDetail = async (data: { url: string, title: string }) => {
    const { url, title } = data
    navigation.navigate("WebViewPage", { url, title })
    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/ad/callback",
      { "adSource": "HOME", "adType": "VIDEO_AD" }, { headers: { Authorization: basicSotre.token } })
    if (res.code === "200") {
      //记录时间
      const diffTime = !basicSotre.lookTime ? 1 : moment().diff(moment(basicSotre.lookTime), "minutes")
      if (diffTime >= 1) {
        Toast.show(('恭喜获得一个红包，请在首页领取'), {
          duration: 200,
          position: 0
        })
        runInAction(() => {
          basicSotre.lookTime = moment()
        })
      }

    }
  }

  const receiveRedPacket = async () => {
    popShow()
    const res = await NetPost("http://nfxuanniao.cn/app-api/app/v1/adRedPacket/receive",
      { "adCode": "HOME_VIDEO_AD" }, {
      headers: { Authorization: basicSotre.token }
    })
    if (res.code === "200") {
      getRedPacket()
    }
  }

  const goLink = (url: string) => {
    Linking.openURL(url)
  }


  const popShow = () => {
    ModalPanel.show({
      childrenComponent: (
        <TouchableNativeFeedback onPress={ModalPanel.dismiss} >
          <View>
            <Image style={{ width: windowWidth * 0.8, height: windowHeight * 0.8 }} resizeMode="contain" source={require("@/business/images/home_video_red_packet_pop_up_box.png")} />
            <Text style={{ fontSize: 23, color: "#49e99f", fontWeight: "800", position: "absolute", top: windowHeight * 0.5, alignSelf: "center" }} >领取成功</Text>
          </View>
        </TouchableNativeFeedback>
      )
    })
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => { goDetail(item) }}
        style={{
          width: "50%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          marginHorizontal: 8,
          borderBottomColor: "#999",
          paddingBottom: 16,
        }}>
        <View style={{ width: "40%" }} >
          <Text style={{ fontSize: 16 }} >
            {item.title}
          </Text>
        </View>
        <Image resizeMode="cover" style={{ width: 80, height: 80, marginRight: 16 }} source={{ uri: item.picUrl }} />

      </TouchableOpacity>
    )
  }

  const ListHeaderComponent = () => {


    return (
      <>
        <SwiperFlatList
          autoplay
          autoplayLoop
        >
          {swiperData.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {
                goLink(item.toUrl)
              }} key={index}>
                <Image
                  resizeMode="stretch"

                  style={{ width: windowWidth, height: 200 }}
                  source={{ uri: item.bannerUrl }}
                />
              </TouchableOpacity>
            )
          })}
        </SwiperFlatList>

        <TouchableOpacity onPress={toGame} >


          <Image style={{ width: windowWidth - 72, height: 236 / 948 * (windowWidth - 72), marginVertical: 20, alignSelf: "center" }} source={require("@/business/images/start.png")} />
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 10, marginBottom: 10, height: 55 }}>

          {redPacket.map((item, index) => {
            if (item.status === "1") {
              return (
                <Image key={index} style={{ height: 55, width: 37 }} source={require("@/business/images/home_watching_video_to_make_money.png")} />
              )
            }
            return (
              <TouchableOpacity onPress={receiveRedPacket} key={index} disabled={item.status !== "2"} style={{ height: 55, width: 37, justifyContent: "center", alignItems: "center" }} >
                {
                  item.status === "2" ? (
                    <>
                      <Image style={{ height: 36, width: 24 }} source={require("@/business/images/home_watching_video_to_make_mone.gif")} />
                    </>
                  ) : (
                    <>
                      <Image style={{ height: 36, width: 24 }} source={require("@/business/images/red_envelope_carnival_award.png")} />
                      <View style={{ position: "absolute", backgroundColor: "rgba(0,0,0,0.4)", height: 55, width: 37, }} />
                    </>
                  )
                }

              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </>
    )
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', }}
    >
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        data={data}
        numColumns={2}
      />
    </View>
  )
}
export default inject('basicSotre')(observer(Home))
