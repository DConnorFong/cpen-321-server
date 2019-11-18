import React, { Component } from 'react';
import { TouchableHighlight, View, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    navbarStyles,
    navbarBaseColor,
    navbarActiveColor,
    navbarHighlightColor,
} from '../../styles/navbar';
import { viewEnum } from '../../enum/viewEnum';
import { hook } from 'cavy';

interface INavBarProps {
    handleViewChange: (id: number) => void;
}

/*
 * active: <viewEnum> - <viewEnumOption>
 */
interface INavBarState {
    active: number;
    options: any[];
}

class Navbar extends Component<INavBarProps, INavBarState> {
    constructor(props: INavBarProps) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.renderNavbar = this.renderNavbar.bind(this);
        this.renderSelectionColor = this.renderSelectionColor.bind(this);

        this.state = {
            active: 0,
            options: [
                {
                    key: viewEnum.group,
                    title: 'Group',
                    icon: 'ios-people',
                },
                {
                    key: viewEnum.schedule,
                    title: 'Schedule',
                    icon: 'ios-calendar',
                },
                {
                    key: viewEnum.chat,
                    title: 'Messages',
                    icon: 'ios-text',
                },
                {
                    key: viewEnum.settings,
                    title: 'Settings',
                    icon: 'ios-settings',
                },
            ],
        };
    }

    public render() {
        return (
            <SafeAreaView style={navbarStyles.navbarContainer}>
                {this.renderNavbar()}
            </SafeAreaView>
        );
    }

    // TODO: refactor top level handler to accept an argument (call a single onPressNavButton)
    private handleSelection(selection: number) {
        this.setState({
            active: selection,
        });

        this.props.handleViewChange(selection);
    }

    private renderNavbar() {
        return this.state.options.map(option => (
            <TouchableHighlight
                key={option.key}
                onPress={this.handleSelection.bind(this, option.key)}
                style={navbarStyles.navButton}
                underlayColor={navbarHighlightColor}
                ref={this.props.generateTestHook('Navbar.' + option.title)}
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

    private renderSelectionColor(active: number) {
        if (active === this.state.active) return navbarActiveColor;
        else return navbarBaseColor;
    }
}

const TestableNavbar = hook(Navbar);
export default TestableNavbar;
