import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsRoutes} from './_types/navigation';
import {
  CreateScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
  SearchScreen,
} from '../screens';
import {
  CreateIcon,
  FeedIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/icons';
import {useTheme} from '../hooks';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator<BottomTabsRoutes>();

export default function BottomTabs() {
  const {currentColor} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: currentColor.secondary,
        tabBarInactiveTintColor: currentColor.lightGray,
        tabBarStyle: {
          backgroundColor: currentColor.primary,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <FeedIcon color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <SearchIcon color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <CreateIcon color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <HeartIcon color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <UserIcon color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
