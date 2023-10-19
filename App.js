import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import RegisterScreen from './Screens/RegisterScreen';
import RestaurantScreen from './Screens/RestaurantScreen';
import store from './store/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {

  function MainStack() {
    return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Restaurants" component={RestaurantScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Welcome' component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MainStack} />
        <Tab.Screen name="Fav" component={RestaurantScreen} />
      </Tab.Navigator>
    );
  }
  
  
  return (
<Provider store={store}>
      <NavigationContainer>
      <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
