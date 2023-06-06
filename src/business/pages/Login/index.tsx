import React, { useState } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, useWindowDimensions, Linking, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { NetPost } from '@/business/utils/netWork';
import { StoreData } from '@/business/utils/cache';
import { inject, observer } from 'mobx-react'
import { runInAction } from 'mobx'
import Toast from '@/business/components/Toast';
import { WINDOW_WIDTH } from '@/business/components/DeviceInfo';
import Loading from '@/business/components/Loading';
type Props = {
  navigation: any
  [key: string]: any
}
type State = {
  [key: string]: any
}

const Login = (props: Props) => {
  const windowWidth = useWindowDimensions().width;
  const [isSelect, setIsSelect] = useState(false)
  const [authCode, setAuthCode] = useState("")
  const [password, setPassword] = useState("")
  const login = async () => {
    if (!isSelect) {
      Toast.show("请勾选用户协议", {
        duration: 300,
        position: 0
      });
      return
    }
    Loading.show()

    const res = await NetPost("http://39.104.22.215:80/app-api/app/v1/certification",
      {
        authCode,
        password,
        channel: "XN-YouShang",
        authType: "PASSWORD",
        imei: "275da00a-80e8-4a4e-88bd-46a913596620",
        deviceId: "7d4a4ef0d2cc1c1f"
      })
    const { code, data, message } = res
    Loading.dismiss()
    if (code === "200") {
      StoreData("token", JSON.stringify({ token: data }))
      runInAction(() => {
        props.basicSotre.token = data
      })
      const res = await NetPost("http://39.104.22.215:80/app-api/app/v1/memberInfo",
        {}, {
        headers: { Authorization: data }
      })
      if (res.code === "200") {
        runInAction(() => {
          props.basicSotre.mineData = res.data
        })
      }
    } else {
      Toast.show(message, {
        duration: 300,
        position: 0
      })
    }
  }

  const logon = async () => {
    if (!isSelect) {
      Toast.show("请勾选用户协议", {
        duration: 300,
        position: 0
      });
      return
    }
    Loading.show()

    const res = await NetPost("http://39.104.22.215:80/app-api/app/v1/signUp",
      {
        username: authCode,
        password,
        channel: "XN-YouShang",
      })
    console.log(res);

    const { code, message } = res
    Loading.dismiss()
    if (code === "200") {
      login()
    } else {
      Toast.show(message, {
        duration: 300,
        position: 0
      })
    }
  }

  const img = isSelect ? require("@/business/images/sign_in_selected_theme1.webp") : require("@/business/images/sign_in_not_selected.webp")
  return (
    <View style={styles.container}>
      <Image style={{ width: WINDOW_WIDTH, height: "100%", position: "absolute", zIndex: -1 }} source={require("@/business/images/sign_in_backdrop.webp")} />
      <Image source={require('@/business/images/logo.png')} style={styles.iconStyle} />
      <TextInput value={authCode} onChangeText={(value) => setAuthCode(value)} placeholder={'请输入用户名'} clearButtonMode={'while-editing'} style={[styles.textInputStyle, { width: windowWidth * 0.9, }]} />
      <TextInput value={password} onChangeText={(value) => setPassword(value)} placeholder={'请输入密码'}
        clearButtonMode={'while-editing'}
        secureTextEntry={true}
        selectionColor={'black'}
        keyboardAppearance={'dark'} style={[styles.textInputStyle, { width: windowWidth * 0.9, }]} />
      <TouchableOpacity onPress={login} style={[styles.loginBtnStyle, { width: windowWidth * 0.9, marginVertical: 30 }]}>
        <Text style={{ color: 'white' }}>登录</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logon} style={[styles.loginBtnStyle, { width: windowWidth * 0.9, marginBottom: 30, backgroundColor: "#82859C" }]}>
        <Text style={{ color: 'white' }}>立即注册</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center" }} >
        <TouchableOpacity onPress={() => {
          setIsSelect(!isSelect)
        }} >
          <Image source={img} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 13, color: "#333" }} >我已阅读并同意<Text style={{ color: "#05b4fa" }} >《用户协议》《隐私政策》</Text></Text>

      </View>
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1
  },
  iconStyle: {
    width: 80,
    height: 80,
    marginTop: 150,
    marginBottom: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  textInputStyle: {
    height: 38,
    backgroundColor: 'white',
    marginBottom: 1,
    paddingLeft: 10,
    textAlign: 'left',
  },
  loginBtnStyle: {
    height: 35,
    backgroundColor: '#F80707',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  settingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "80%"
  },
  otherLoginStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  ohterImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
});

export default inject('basicSotre')(observer(Login))


