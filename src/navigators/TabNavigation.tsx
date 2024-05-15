import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import OrderHistory from '../screens/OrderHistory'
import { COLORS } from '../theme/theme'
import { BlurView } from 'expo-blur'
import CustomIcon from '../components/CustomIcon'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={
            {
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle:styles.tabBarStyle,
                tabBarBackground:()=>(
                    <BlurView overlayColor=""
                    blurAmount={15}
                    style={styles.blurStyles}/>
                )
            }}>
            <Tab.Screen name='Home' component={HomeScreen} options={
                {
                    tabBarIcon:({focused,color,size})=>(
                        <Ionicons 
                        name='home' 
                        size={25} 
                        color={focused
                            ?COLORS.primaryOrangeHex
                            :COLORS.primaryDarkGreyHex}
                            style={focused ? styles.activeIcon : null} />
                    )
                }
            }></Tab.Screen>
            <Tab.Screen name='Cart' component={CartScreen} options={
                {
                    tabBarIcon:({focused,color,size})=>(
                        <Ionicons 
                        name='cart' 
                        size={25} 
                        color={focused
                            ?COLORS.primaryOrangeHex
                            :COLORS.primaryDarkGreyHex}
                            style={focused ? styles.activeIcon : null} />
                    )
                }
            }></Tab.Screen>
            <Tab.Screen name='Favorites' component={FavoritesScreen} options={
                {
                    tabBarIcon:({focused,color,size})=>(
                        <MaterialIcons 
                        name='favorite' 
                        size={25} 
                        color={focused
                            ?COLORS.primaryOrangeHex
                            :COLORS.primaryDarkGreyHex}
                        style={focused ? styles.activeIcon : null} />
                    )
                }
            }></Tab.Screen>
            <Tab.Screen name='Order' component={OrderHistory} options={
                {
                    tabBarIcon:({focused,color,size})=>(
                        <MaterialIcons 
                        name='history' 
                        size={25} 
                        color={focused
                            ?COLORS.primaryOrangeHex
                            :COLORS.primaryDarkGreyHex}
                        style={focused ? styles.activeIcon : null} />
                    )
                }
            }></Tab.Screen>
            
        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({
    tabBarStyle:{
        height:80,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent'
    },
    blurStyles:{
        position:'absolute',
        top:0,
        left:0,
        right: 0,
        bottom:0
    },activeIcon: {
        
        shadowColor: COLORS.primaryOrangeHex,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 9.5,
        shadowRadius: 10,
        elevation: 10,
    },
})
export default TabNavigation