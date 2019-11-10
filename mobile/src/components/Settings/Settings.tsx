import React, { Component } from 'react';
import { View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { genericStyles } from '../../styles/generic';

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface IGroupProps {
    userID: string;
}

interface IGroupState {
    isLoading: boolean;
}

export default class Group extends Component<IGroupProps, IGroupState> {
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
                <SafeAreaView style={genericStyles.container}>
                    <Text>Settings</Text>
                </SafeAreaView>
            );
        }
    }
}
