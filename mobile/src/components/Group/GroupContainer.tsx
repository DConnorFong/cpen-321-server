import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { groupContainerStyles } from '../../styles/groupContainer';

interface GroupContainerProps {
    group: {
        name: String;
        members: String[];
    };
}

export default class GroupContainer extends Component<GroupContainerProps, {}> {
    render() {
        return (
            <View style={groupContainerStyles.container}>
                <Text style={groupContainerStyles.groupName}>
                    {this.props.group.name}
                </Text>
                <FlatList
                    data={this.props.group.members}
                    renderItem={({ item }) => (
                        <Text style={groupContainerStyles.groupMember}>
                            {item}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
