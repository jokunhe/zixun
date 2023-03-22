import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mine from '../pages/Mine';
import Home from '../pages/Home';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let img;
          if (route.name === 'Home') {
            if (focused) {
              img = require("../images/home_focused.png")
            } else {
              img = require("../images/home.png")

            }
          } else if (route.name === 'Mine') {
            if (focused) {
              img = require("../images/mine_focused.png")
            } else {
              img = require("../images/mine.png")

            }
          }
          return <Image style={{ height: 30, width: 30 }} source={img} />
        },
        tabBarShowLabel: false,

      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Mine" component={Mine} />
    </Tab.Navigator>
  );
}
