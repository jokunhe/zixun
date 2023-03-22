import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PureComponent, useState } from 'react'
import Login from '../pages/Login'
import { RetrieveData } from '../utils/cache'
import { inject, observer } from 'mobx-react'
import { useMount } from '@/hooks'
import { runInAction } from 'mobx'

const Stack = createNativeStackNavigator()
const CreateNavigation = (props: {
  routers: any,
  screenOptions?: any,
  navigationTheme?: Theme,
  basicSotre: any
}) => {
  const [loading, setLoading] = useState(true)
  const { screenOptions, routers, navigationTheme = DefaultTheme, basicSotre } = props
  useMount(() => {
    getToken()
  })

  const getToken = async () => {
    const res = await RetrieveData("token")
    console.log(res);

    runInAction(() => {
      basicSotre.token = res.token
    })
    setLoading(false)
  }
  const defaultScreenOptions = {
    ...screenOptions
  }


  const getScreenOptions = ({ route, navigation }, _screenOptions) => {
    let options
    if (typeof _screenOptions === 'function') {
      options = {
        ...defaultScreenOptions,
        ..._screenOptions({ route, navigation })
      }
    } else {
      options = {
        ...defaultScreenOptions,
        ..._screenOptions
      }
    }
    return options
  }

  const unLoginRoute = [
    {
      name: 'Login',
      component: Login
    }
  ]
  if (loading) return null
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName='main'
        screenOptions={({ route, navigation }) => {
          const options = getScreenOptions({ route, navigation }, screenOptions)
          return options
        }}
      >
        {/* {routers.map((router) => (
          <Stack.Screen
            key={`Renpho navigation ${router.name}`}
            name={router.name}
            component={router.component}
            options={{ header: () => null, ...router.options }}
          />
        ))} */}
        {!!basicSotre.token && !!basicSotre.token.length ? (
          routers.map((router) => (
            <Stack.Screen
              key={`Renpho navigation ${router.name}`}
              name={router.name}
              component={router.component}
              options={{ header: () => null, ...router.options }}
            />
          ))
        ) : (
          unLoginRoute.map((router) => (
            <Stack.Screen
              key={`Renpho navigation ${router.name}`}
              name={router.name}
              component={router.component}
              options={{ header: () => null, ...router.options }}
            />
          ))
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )


}

export default inject('basicSotre')(observer(CreateNavigation))