import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import PurchaseList from './app/screens/PurchaseList';
import Settings from './app/screens/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import theme from './app/theme/Constants';

const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':      
                            iconName = focused ? 'home' : 'home-outline'; break;
                        case 'Purchases': 
                            iconName = focused ? 'camera' : 'camera-outline'; break;
                        case 'Settings':  
                            iconName = focused ? 'information' : 'information-outline'; break;
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: theme.purple,
                tabBarInactiveTintColor: theme.purple,
            })}
        >
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Purchases' component={PurchaseList}/>
            <Tab.Screen name='Settings' component={Settings}/>
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