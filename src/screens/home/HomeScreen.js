import React, {Component} from 'react';

import {Dimensions, FlatList, Text,RefreshControl, TouchableWithoutFeedback, View} from 'react-native';
import {getHomeData} from '../../actions/HomeAction';
import {connect} from 'react-redux';
import styles from '../home/Styles';
import {Icon} from 'native-base';
import moment from 'moment';
import Loader from '../../components/loader';
import {Strings} from '../../utils/Strings';
import Header from '../../components/header/Header';
import metrics from '../../utils/Metrics';
import {colors} from '../../utils/colors';

/**
 *  This class is used to display the NYTimes most popular Articles
 *
 * @author dipanshu jindal
 * @version 1.0
 */
class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            isRefreshing:false

        };
    }

    componentDidMount(): void {
        this.fetchHomeData()
    }

    fetchHomeData(isRefreshing){
        if (!isRefreshing){
            this.setState({loading: true});
        }else {
            this.setState({isRefreshing: true});
        }
        //this.props.navigation.state.params.period
        this.props.fetchHomeData('all-sections', '1');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.mostPopularData !== prevState.mostPopularData) {
            return {result: nextProps.response};
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mostPopularData !== this.props.mostPopularData) {
            this.setState({loading: false,isRefreshing:false});
            if (this.props.mostPopularData.error === null) {
                if (this.props.mostPopularData.response.results.length > 0) {
                    this.setState({data: this.props.mostPopularData.response.results});
                } else {
                    alert(Strings.NO_DATA_FOUND);
                }
            } else {
                alert(this.props.mostPopularData.error);
            }
        }
    }


    _onItemPress(item) {
        this.props.navigation.navigate('detailScreen', {item: item});
    }

    render() {
        const {data, loading} = this.state;
        return (

            <View style={styles.mainContainer}>
                <Loader loading={loading}/>

                <Header title={'NY Times Most Popular'} btnPressed={() => alert('Coming Soon')} isBack={false}/>


                <View style={styles.newsHeadlineView}>

                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={()=>this.fetchHomeData(true)}
                            />
                        }
                        keyExtractor = { (item, index) => index.toString() }
                        horizontal={false}
                        extraData={data}
                        data={data}
                        renderItem={({item, index}) =>
                            <View style={{marginHorizontal: metrics.screenWidth * (15 / 375), marginVertical: metrics.screenHeight * (10 / 820)}}>
                                <TouchableWithoutFeedback
                                    activeOpacity={1}
                                    onPress={() => this._onItemPress(item)}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.roundViewStyle}/>

                                        <View style={{flex: 2, marginHorizontal: metrics.screenWidth * (10 / 375)}}>
                                            <Text
                                                numberOfLines={2}
                                                style={styles.titleTextStyle}>{item.title}</Text>
                                            <Text numberOfLines={1}
                                                  style={styles.contentTextStyle}>{item.byline}</Text>

                                            <View style={styles.sectionViewStyle}>

                                                <Text
                                                    numberOfLines={2}
                                                    style={styles.contentTextStyle}>{item.section}</Text>

                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Icon type={'Ionicons'} name="md-calendar"
                                                          style={{fontSize: 20, color: colors.darkGrey, marginEnd: metrics.screenWidth * (5 / 375)}}/>

                                                    <Text
                                                        style={[styles.contentTextStyle, {textAlign: 'center'}]}>{moment(item.publishedAt).format('YYYY-MM-DD')}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{flex:.1,justifyContent:'center',alignItems:'center'}}>

                                            <Icon type={'AntDesign'} name="right"
                                                  style={{fontSize: 16, color: colors.darkGrey}}/>

                                        </View>


                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        }
                    />
                </View>


            </View>

        );

    }


}

const mapStateToProps = (state) => {
    return {
        mostPopularData: state.HomeReducer,
    };
};

function bindActions(dispatch) {
    return {
        fetchHomeData: (section, period) => {
            dispatch(getHomeData(section, period));
        },
    };
}

export default connect(mapStateToProps, bindActions)(HomeScreen);
