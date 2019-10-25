import React, { Component } from 'react';
import { TouchableHighlight, View, SafeAreaView, Text } from 'react-native';
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
 *
 * active should correspond to the keys in options
 */
interface NavBarState {
    active: Number;
    options: any[];
}

export default class Navbar extends Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.renderSelectionColor = this.renderSelectionColor.bind(this);

        this.state = {
            active: 0,
            options: [
                {
                    key: 0,
                    title: 'Group',
                    icon: 'ios-people',
                },
                {
                    key: 1,
                    title: 'Schedule',
                    icon: 'ios-calendar',
                },
                {
                    key: 2,
                    title: 'Messages',
                    icon: 'ios-text',
                },
                {
                    key: 3,
                    title: 'Settings',
                    icon: 'ios-settings',
                },
            ],
        };
    }

    render() {
        return (
            <SafeAreaView style={navbarStyles.navbarContainer}>
                {this.renderNavbar()}
            </SafeAreaView>
        );
    }

    // TODO: refactor top level handler to accept an argument (call a single onPressNavButton)
    handleSelection(selection: Number) {
        this.setState({
            active: selection,
        });

        switch (selection) {
            case 0:
                this.props.OnPressNavButtonSearch();
                break;
            case 1:
                this.props.OnPressNavButtonSch();
                break;
            case 2:
                this.props.OnPressNavButtonChat();
                break;
            case 3:
                // TODO: route to settings view
                break;
            default:
                // TODO: describe this logic
                break;
        }
    }

    renderNavbar() {
        return this.state.options.map(option => (
            <TouchableHighlight
                key={option.key}
                onPress={this.handleSelection.bind(this, option.key)}
                style={navbarStyles.navButton}
                underlayColor={navbarHighlightColor}
            >
                <View style={navbarStyles.navButtonContainer}>
                    <View style={navbarStyles.navButtonIconContainer}>
                        <Ionicons
                            name={option.icon}
                            size={30}
                            color={this.renderSelectionColor(option.key)}
                        />
                    </View>
                    <View style={navbarStyles.navButtonTextContainer}>
                        <Text
                            style={[
                                navbarStyles.navButtonText,
                                {
                                    color: this.renderSelectionColor(
                                        option.key
                                    ),
                                },
                            ]}
                        >
                            {option.title}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        ));
    }

    renderSelectionColor(active: Number) {
        if (active === this.state.active) return navbarActiveColor;
        else return navbarBaseColor;
    }
}
