import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';

interface NavBarProps {OnPressNavButtonSearch: Function;
                       OnPressNavButtonSch: Function;
                       OnPressNavButtonChat: Function;}

interface NavBarState {}
export default class Navbar extends Component<NavBarProps, NavBarState> {

    render() {
        return (
            <View style={styles.navbarContainer}>

                <TouchableHighlight onPress={this.props.OnPressNavButtonSearch.bind(this)} underlayColor='#019898'>
                    <View style={styles.navButton}>
                        <Text style={styles.navButtonTitle}>Search</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.OnPressNavButtonSch.bind(this)} underlayColor='#019898'>
                    <View style={styles.navButton}>
                        <Text style={styles.navButtonTitle}>Sch</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.OnPressNavButtonChat.bind(this)} underlayColor='#019898'>
                    <View style={styles.navButton}>
                        <Text style={styles.navButtonTitle}>Chat</Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#016564',
    },
    navButton: {
        flex: 1,
        margin: 0,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'white',
        borderLeftWidth: 1,
        borderRightColor: 'white',
        borderRightWidth: 1,
    },
    navButtonTitle: {
        alignItems: 'center',
        fontSize: 25,
        color: 'white',
    },
});