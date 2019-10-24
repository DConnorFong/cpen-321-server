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

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface GroupProps {
    userID: String;
}

interface GroupState {
    isLoading: boolean;
    groups: any[];
}

export default class Group extends Component<GroupProps, GroupState> {
    groups = [];

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            groups: this.groups,
        };
        this.searchPress = this.searchPress.bind(this);
    }

    render() {
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

    renderGroups() {
        return this.groups.map(memberGroup => (
            <GroupContainer group={memberGroup} key={memberGroup} />
        ));
    }

    searchPress() {
        fetch(`${endpoint}/user/${this.props.userID}/match`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) return response.json();
                else throw 'Error: problem retrieving group match';
            })
            .then(responseJson => {
                this.groupMatch(responseJson['names']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    groupMatch(memberList) {
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
