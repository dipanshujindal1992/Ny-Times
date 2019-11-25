import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import LaunchScreen from "../src/screens/launch/LaunchScreen";

test('Launch snapshot' , () => {
    const snap = renderer.create(
        <LaunchScreen/>
    ).toJSON();
    expect(snap).toMatchSnapshot();

});
