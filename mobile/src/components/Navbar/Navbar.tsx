import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    View,
    SafeAreaView,
    Text,
} from 'react-native';

interface NavBarProps {
    OnPressNavButtonSearch: Function;
    OnPressNavButtonSch: Function;
    OnPressNavButtonChat: Function;
}

interface NavBarState {}
export default class Navbar extends Component<NavBarProps, NavBarState> {
    render() {
        return (
            <SafeAreaView style={styles.navbarContainer}>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonSearch.bind(this)}
                    style={styles.leftNavButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={styles.navButtonContainer}>
                        <Text style={styles.navButtonTitle}>Search</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonSch.bind(this)}
                    style={styles.navButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={styles.navButtonContainer}>
                        <Text style={styles.navButtonTitle}>Schedule</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonChat.bind(this)}
                    style={styles.rightNavButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={styles.navButtonContainer}>
                        <Text style={styles.navButtonTitle}>Chat</Text>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    navbarContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#01a3a4',
        justifyContent: 'center',
    },
    navButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    leftNavButton: {
        flex: 1,
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 1,
        borderRightColor: 'white',
        borderRightWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    rightNavButton: {
        flex: 1,
        alignItems: 'center',
        borderTopColor: 'white',
        borderTopWidth: 1,
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    navButtonTitle: {
        fontSize: 15,
        color: 'white',
    },
});
