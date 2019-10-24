import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    View,
    SafeAreaView,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    navbarStyles,
    navbarBaseColor,
    navbarActiveColor,
    navbarHighlightColor,
} from '../../styles/navbar';

interface NavBarProps {
    OnPressNavButtonSearch: Function;
    OnPressNavButtonSch: Function;
    OnPressNavButtonChat: Function;
}

/*
 * active: 0 - Group; 1 - Schedule; 2 - Messages; 3 - Settings
 */
interface NavBarState {
    active: Number;
}

export default class Navbar extends Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);

        this.handleSelectionGroup = this.handleSelectionGroup.bind(this);
        this.handleSelectionSchedule = this.handleSelectionSchedule.bind(this);
        this.handleSelectionMessages = this.handleSelectionMessages.bind(this);
        this.handleSelectionSettings = this.handleSelectionSettings.bind(this);
        this.renderSelectionColor = this.renderSelectionColor.bind(this);

        this.state = {
            active: 0,
        };
    }

    render() {
        return (
            <SafeAreaView style={navbarStyles.navbarContainer}>
                <TouchableHighlight
                    onPress={this.handleSelectionGroup.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor={navbarHighlightColor}
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-people"
                                size={30}
                                color={this.renderSelectionColor(0)}
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text
                                style={[
                                    navbarStyles.navButtonText,
                                    { color: this.renderSelectionColor(0) },
                                ]}
                            >
                                Group
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.handleSelectionSchedule.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor={navbarHighlightColor}
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-calendar"
                                size={30}
                                color={this.renderSelectionColor(1)}
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text
                                style={[
                                    navbarStyles.navButtonText,
                                    { color: this.renderSelectionColor(1) },
                                ]}
                            >
                                Schedule
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.handleSelectionMessages.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor={navbarHighlightColor}
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-text"
                                size={30}
                                color={this.renderSelectionColor(2)}
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text
                                style={[
                                    navbarStyles.navButtonText,
                                    { color: this.renderSelectionColor(2) },
                                ]}
                            >
                                Messages
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.handleSelectionSettings.bind(this)}
                    style={navbarStyles.navButton}
                    underlayColor={navbarHighlightColor}
                >
                    <View style={navbarStyles.navButtonContainer}>
                        <View style={navbarStyles.navButtonIconContainer}>
                            <Ionicons
                                name="ios-settings"
                                size={30}
                                color={this.renderSelectionColor(3)}
                            />
                        </View>
                        <View style={navbarStyles.navButtonTextContainer}>
                            <Text
                                style={[
                                    navbarStyles.navButtonText,
                                    { color: this.renderSelectionColor(3) },
                                ]}
                            >
                                Settings
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }

    handleSelectionGroup() {
        this.setState({
            active: 0,
        });
        this.props.OnPressNavButtonSearch();
    }

    handleSelectionSchedule() {
        this.setState({
            active: 1,
        });
        this.props.OnPressNavButtonSch();
    }

    handleSelectionMessages() {
        this.setState({
            active: 2,
        });
        this.props.OnPressNavButtonChat();
    }

    handleSelectionSettings() {
        this.setState({
            active: 3,
        });
    }

    renderSelectionColor(active: Number) {
        if (active === this.state.active) return navbarActiveColor;
        else return navbarBaseColor;
    }
}
