import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    View,
    SafeAreaView,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navbarStyles } from '../../styles/navbar';

interface NavBarProps {
    OnPressNavButtonSearch: Function;
    OnPressNavButtonSch: Function;
    OnPressNavButtonChat: Function;
}

interface NavBarState {}
export default class Navbar extends Component<NavBarProps, NavBarState> {
    render() {
        return (
            <SafeAreaView style={navbarStyles.navbarContainer}>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonSearch.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-people"
                                size={35}
                                color="white"
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text style={navbarStyles.navButtonText}>
                                Group
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonSch.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-calendar"
                                size={35}
                                color="white"
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text style={navbarStyles.navButtonText}>
                                Schedule
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.props.OnPressNavButtonChat.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor="rgba(255,255,255,0.4)"
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons name="ios-text" size={35} color="white" />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text style={navbarStyles.navButtonText}>
                                Messages
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
