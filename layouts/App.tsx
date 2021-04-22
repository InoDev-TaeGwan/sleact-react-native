import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loadable from '@loadable/component';

const Login = loadable(() => import('../pages/Login'));
const Signup = loadable(() => import('../pages/Signup'));
const Workspace = loadable(() => import('./Workspace/index'));

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Workspace" component={Workspace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
