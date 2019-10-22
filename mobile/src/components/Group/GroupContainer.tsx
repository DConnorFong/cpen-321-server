import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

interface GroupContainerProps {
    group: {
        name: String;
        members: String[];
    }
}

export default class GroupContainer extends Component<GroupContainerProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.groupName}>
                    {this.props.group.name}
                </Text>
                <FlatList
                    data={this.props.group.members}
                    renderItem={
                        ({ item }) =>
                            <Text style={styles.groupMember}>{item}</Text>
                    }
                    keyExtractor={
                        (item, index) => index.toString()
                    } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#01a3a4',
        justifyContent: 'flex-start',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    groupName: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    groupMember: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 3,
    }
});
