import React, { PureComponent } from 'react'
import WebViewPage from '../pages/WebView'
import CreateNavigation from './CreateNavigator'
import TabBar from './TabBar'
const routers = [
  {
    name: 'TabBar',
    component: TabBar
  },
  {
    name: "WebViewPage",
    component: WebViewPage
  }
]
const Routes = () => {
  return (
    <CreateNavigation routers={routers} />
  )
}

export default Routes
