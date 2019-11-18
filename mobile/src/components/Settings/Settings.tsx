import React, { Component } from 'react';
import { View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { genericStyles } from '../../styles/generic';
import { hook } from 'cavy';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface IGroupProps {
    userID: string;
}

interface IGroupState {
    isLoading: boolean;
}

class Settings extends Component<IGroupProps, IGroupState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    public render() {
        if (this.state.isLoading) {
            return (
                <View style={genericStyles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <SafeAreaView
                    ref={this.props.generateTestHook('Settings.screen')}
                    style={genericStyles.container}
                >
                    <Text>Settings</Text>
                </SafeAreaView>
            );
        }
    }
}

const TestableSettings = hook(Settings);
export default TestableSettings;
