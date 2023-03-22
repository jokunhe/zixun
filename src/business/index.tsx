import * as React from 'react';
import Routes from './routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings'
import { Provider } from 'mobx-react'
import store from './stores'
function App(props: any) {
  const { token } = props
  store.basicSotre.token = token
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <RootSiblingParent>
        <Provider {...store}>
          <Routes />
        </Provider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}

export default App;