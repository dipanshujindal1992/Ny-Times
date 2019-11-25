import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../utils/colors';
import {Icon} from 'native-base';

const Header = (props) => {

    const {isBack}=props
    return <View style={{
        height: 50,
        width:'100%',
        backgroundColor: colors.primary,
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>

        <TouchableOpacity style={{marginLeft: 10}} onPress={() => props.btnPressed()}>

            {isBack? <Icon type={'AntDesign'} name={'left'} style={{fontSize: 20, color: 'white'}}/>:
                <Icon type={'Entypo'} name={'menu'} style={{fontSize: 30, color: 'white'}}/>
            }

        </TouchableOpacity>
        <Text
            numberOfLines={1}

            style={{
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: 16,
                width:'80%',

            fontWeight: 'bold',
            color:'white'
        }}>{props.title}</Text>
        <Text>{''}</Text>

    </View>
};


export default Header
