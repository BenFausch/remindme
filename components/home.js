import React from 'react';
import { Text, View, Button } from 'react-native';

import {LoginButton, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
         <LoginButton
         publishPermissions={['publish_actions']}
         />
      </View>
    );
  }
}
