import React from 'react'
import {View,TextInput,Text} from 'react-native'
import {Button} from 'native-base'
import {colors} from '../../utils/colors';
export default class LaunchScreen extends  React.Component{

    constructor(props){
        super(props)
        this.state={
            period:''
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                <Text style={{color:'black',fontSize:20}}>NY Times</Text>

                <TextInput

                    style={{ height :40,paddingStart:15,width:'80%',borderColor: 'gray', marginTop:20,borderWidth: 1, borderRadius:25}}
                    onChangeText={(period) => this.setState({period})}
                    value={this.state.period}
                    keyboardType={'numeric'}
                    placeholder={'Period'}
                />

                <Button primary style={{marginTop:40, width:'60%', borderRadius: 20, justifyContent:'center', alignItems:'center', backgroundColor:colors.primary}}
                  onPress={()=>{
                      let period=this.state.period
                      if (!period){
                          alert("Please enter period")
                      }else if (period==1 || period==7 || period==30) {
                          this.props.navigation.navigate('homeScreen',{period:period})


                      }else {
                          alert("Please enter either 1, 7 or 30.")
                      }
                  }}
                >
                    <Text style={{color:'white'}}>SUBMIT</Text>
                </Button>

            </View>
        );
    }

}
