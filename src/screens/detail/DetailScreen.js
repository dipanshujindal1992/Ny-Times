import React, {Component} from 'react';

import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from '../detail/Styles';
import {connect} from 'react-redux';
import Header from '../../components/header/Header';
import {colors} from '../../utils/colors';
import metrics from '../../utils/Metrics';
import {Icon} from "native-base";
import moment from 'moment';
import Loader from '../../components/loader';

const window = Dimensions.get('window');


/**
 *  This class is used to display the detail of top-headline new selected from HomeScreen
 *
 * @author dipanshujindal
 * @version 1.0
 */
class DetailScreen extends Component {
    constructor(props) {
        super(props);
       let item = props.navigation.state.params.item;
        this.state = {
            title: item.title,
            url: item.url,
            loading:false
        };
    }

    render() {

        const {title,url,loading}=this.state
        return (
            <View style={styles.mainContainer}>

                {/************* Header View Start **************/}

                <Header title={title} isBack={true} btnPressed={()=>this.props.navigation.goBack()}/>
                <Loader loading={loading}/>


                    <View style={{margin: 10}}>

                        <WebView
                            style={{height:metrics.screenHeight * (500 / 820),width:metrics.screenWidth}}
                            originWhitelist={['*']}
                            domStorageEnabled={true}
                            javaScriptEnabled={true}
                            onLoadStart={()=>{
                                this.setState({loading:true})
                            }}
                            onLoadEnd={()=>{
                                this.setState({loading:false})
                            }}
                            source={{uri: url}}

                        />

                    </View>



            </View>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        mostPopularData: state.HomeReducer
    };
};



export default connect(mapStateToProps, null)(DetailScreen);


