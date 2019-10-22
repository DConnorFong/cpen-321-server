import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import GroupContainer from './GroupContainer'

interface GroupProps { }

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
                    <TouchableOpacity style={styles.searchButton}>
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
