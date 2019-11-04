import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import GroupContainer from './GroupContainer';
import { genericStyles } from '../../styles/generic';
import { groupStyles } from '../../styles/group';
import globals from '../../globals';

const endpoint = globals.endpoint;

interface IGroupProps {
    userID: string;
}

interface IGroupState {
    isLoading: boolean;
    groups: any[];
}

export default class Group extends Component<IGroupProps, IGroupState> {
    private groups = [];

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            groups: this.groups,
        };
        this.searchPress = this.searchPress.bind(this);
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
                    <View style={genericStyles.titleContainer}>
                        <Text style={genericStyles.title}>Groups</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={groupStyles.contentContainer}
                    >
                        {this.renderGroups()}
                    </ScrollView>
                    <TouchableOpacity
                        style={genericStyles.button}
                        onPress={this.searchPress}
                    >
                        <Text style={genericStyles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            );
        }
    }

    private renderGroups() {
        return this.groups.map(memberGroup => (
            <GroupContainer group={memberGroup} key={memberGroup} />
        ));
    }

    private searchPress() {
        fetch(`${endpoint}/user/${this.props.userID}/match`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Error: problem retrieving group match';
                }
            })
            .then(responseJson => {
                this.groupMatch(responseJson['names']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    private groupMatch(memberList) {
        var memberNames = [];
        for (let memberItem of memberList) {
            // memberItem = memberItem.substring(0, memberItem.indexOf(':'));
            memberNames.push(memberItem);
        }
        this.groups.push({
            name: 'Group 1',
            members: memberNames,
        });
        this.setState({
            groups: this.groups,
        });
    }
}
