import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from "../src/screens/home/HomeScreen";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
const mockStore = configureStore([]);
import {getHomeData} from '../src/actions/HomeAction';
describe('My Connected React-Redux Component', () => {
    let store;
    let  component;
    beforeEach(() => {
        store = mockStore({
            period: '1',
        });
          component = renderer.create(
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        ).toJSON();

    });
    it('should render with given state from Redux store', () => {

    });
    it('should dispatch an action on button click', () => {

    });
});



