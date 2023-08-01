const baseUrl = "http://nfxuanniao.cn/"
const adUrl = "http://xn-ad.nfxuanniao.cn/"
const serverUrl = {
  login: baseUrl + "app-api/app/v1/certification",
  register: baseUrl + "app-api/app/v1/signUp",
  memberInfo: baseUrl + "app-api/app/v1/memberInfo",
  subtractBalance: baseUrl + "app-api/app/v1/subtractBalance",
  adList: adUrl + "api/ad/banner/list/public?groupId=1001",
  getRedPacket: baseUrl + "app-api/app/v1/adRedPacket/list",
  clickAd: baseUrl + "app-api/app/v1/ad/callback",
  receiveRedPacket: baseUrl + "app-api/app/v1/adRedPacket/receive",
}

export default serverUrl