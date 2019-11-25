import React, {Component} from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from '../screens/home/HomeScreen';
import {connect} from 'react-redux';
import DetailScreen from '../screens/detail/DetailScreen';
import SideMenuItems from './SideMenuItems';
import {createStackNavigator} from 'react-navigation-stack';
import LaunchScreen from '../screens/launch/LaunchScreen';


const AppNav = createDrawerNavigator(
    {
        homeScreen: HomeScreen,

    },
    {
        initialRouteName: 'homeScreen',
        contentComponent: SideMenuItems,

    },
);

const stackNavigator = createStackNavigator({
    drawer: AppNav,
    detailScreen: DetailScreen,
},{
    headerMode: 'none',
});

const switchNavigator=createSwitchNavigator(
    {
        LaunchScreen: LaunchScreen,
        App: stackNavigator,

    },
    {
        initialRouteName: 'LaunchScreen',
        headerMode: 'none',
    }
);

const AppNavigation = createAppContainer(switchNavigator);

  class AppNavigator extends Component{
    render() {
        return (
            <AppNavigation/>
        );
    }

}
//export default AppNavigation;

export default connect(
    null,
    null
)(AppNavigator);
