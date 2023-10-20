import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as variables from '../constants/variables';
import { ic_chevron_left } from '../constants/assets';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../router/router';

interface Props {
    title?: string;
    onPress?(): any;
    backgroundColor?: string;
    contentColor?: string;
    left?: number;
    hideIconBack?: boolean;
}

const Header = (props: Props) => {
    const navigation = useNavigation<StackNavigation>();

    const {
        title = 'Title',
        onPress,
        backgroundColor,
        contentColor,
        left,
        hideIconBack = false,
    } = props;

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor ?? 'transparent', }]}>
            <TouchableOpacity
                onPress={onPress ?? navigation.goBack}
                style={[styles.iconContainer, { left: left ?? 0 }]}
            >
                {!hideIconBack && <Image
                    source={ic_chevron_left}
                    style={[styles.icon, { tintColor: contentColor ?? variables.colors.primary }]}
                    resizeMode='contain'
                />}
            </TouchableOpacity>
            <Text style={[styles.header, { color: contentColor ?? variables.colors.primary }]}>
                {title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: variables.responsiveHeight(2),
    },
    header: {
        fontWeight: 'bold',
        fontSize: 25,
        color: variables.colors.primary,
    },
    iconContainer: {
        position: 'absolute',
        resizeMode: 'contain'
    },
    icon: {
        width: variables.responsiveHeight(3.5),
        height: variables.responsiveHeight(3.5),
        tintColor: variables.colors.primary,
        // tintColor: 'white',
    }
})
export default Header;
