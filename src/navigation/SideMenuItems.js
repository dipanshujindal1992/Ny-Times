import React, {Component} from 'react';
import {View,TouchableOpacity,Text} from 'react-native';

export default function SideMenuItems(props){

        return (<View style={{flex: 1}}>
            <TouchableOpacity style={{paddingHorizontal:10,marginTop:20}} onPress={()=>props.navigation.closeDrawer()}>
                <Text >{'Home'}</Text>

            </TouchableOpacity>

        </View>);


}
