import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './app/screens/Home';
import ItemList from './app/screens/ItemList';
import Totals from './app/screens/Totals';
import Settings from './app/screens/Settings';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import theme from './app/theme/Constants';

const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name='Purchases'
                component={ItemList}
            />
            <HomeStack.Screen 
                name='Totals'
                component={Totals}
            />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':      
                            iconName = focused ? 'home' : 'home-outline'; 
                            break;
                        case 'HomeStackGroup': 
                            iconName = focused ? 'camera' : 'camera-outline'; 
                            break;
                        case 'Settings':  
                            iconName = focused ? 'information' : 'information-outline'; 
                            break;
                    }
                    return <MaterialCommunityIcons name={iconName} size={34} color={color} />
                },
                tabBarActiveTintColor: theme.purple,
                tabBarInactiveTintColor: theme.taupe,
            })}
        >
            <Tab.Screen name='Home' component={Home} 
                options={{ tabBarShowLabel: false }}
            />
            <Tab.Screen name='HomeStackGroup' component={HomeStackGroup}
                options={{ tabBarShowLabel: false, headerShown: false}}
            />
            <Tab.Screen name='Settings' component={Settings}
                options={{ tabBarShowLabel: false }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    );
}