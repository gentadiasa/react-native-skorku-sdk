import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import { colors, responsiveHeight } from '../constants/variables';

export default class Loader extends Component {
    render() {
        return (
            <Modal
                transparent
                // visible={this.state.isLoading}
                visible={true}
            >
            <View
                style={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                }}
            >
                
                <ActivityIndicator
                    size={responsiveHeight(10)}
                    color={colors.primary}
                    style={{backgroundColor:'white',borderRadius:50}}
                />
            </View>
            </Modal>
        );
    }
}