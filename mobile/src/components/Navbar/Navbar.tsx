import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';

export default class Navbar extends Component {
    _onPressSchNavButton()
    {
        {/*switch to schedule view here*/}
        alert("Switch to Schedule View")
        return
    }
    _onPressChatNavButton()
    {
        {/*switch to chat view here*/}
        alert("Switch to Chat View")
        return
    }
    _onPressSearchNavButton()
    {
        {/*switch to Search view here*/}
        alert("Switch to Search View")
        return
    }

    render() {
        return (
            <View style={styles.navbarContainer}>
                <TouchableHighlight onPress={this._onPressSearchNavButton} underlayColor='#019898'>
                    <View style={styles.navButton}>
                        <Text style={styles.navButtonTitle}>Search</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressSchNavButton} underlayColor='#019898'>
                    <View style={styles.navButton}>
                        <Text style={styles.navButtonTitle}>Sch</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressChatNavButton} underlayColor='#019898'>
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
