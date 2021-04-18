import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../source/screens/AuthScreen';

const AuthStack = createStackNavigator();

const Auth=()=> {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={AuthScreen} />
      </AuthStack.Navigator>
    );
}

const HomeStack