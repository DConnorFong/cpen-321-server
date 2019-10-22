import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import GroupContainer from './GroupContainer'

const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface GroupProps { userID: String; }

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
        }
        this.searchPress = this.searchPress.bind(this);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Groups</Text>
                    </View>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {this.renderGroups()}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={this.searchPress}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            );
        }
    }

    renderGroups() {
        return this.groups.map((memberGroup) =>
            <GroupContainer group={memberGroup} />
        );
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
                else throw ('Error: problem retrieving group match');
            })
            .then(responseJson => {
                this.groupMatch(responseJson['members']);
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
            name: "Group 1",
            members: memberNames,
        });
        this.setState({
            groups: this.groups,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#01a3a4',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    searchButton: {
        backgroundColor: '#01a3a4',
        marginVertical: 10,
        paddingVertical: 15,
        marginHorizontal: 15,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    }
});
