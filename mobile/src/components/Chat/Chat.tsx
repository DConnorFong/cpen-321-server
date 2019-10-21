import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import Navbar from './../Navbar/Navbar';

export default class Chat extends Component {
    _onPressButton() {
        {/*open chatroom Here*/}
        alert('Button tap -> open chatroom')
        return
    }
    _onLongPressButton()
    {
        {/*open chatroom Here*/}
        alert("Long Button Press -> open chatroom")
        return
    }
    _onPressAddButton()
    {
        alert("Create new chatroom")
        return
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Messages</Text>
                </View>
                <View style={styles.addButtonContainer}>
                    <TouchableOpacity onPress={this._onPressAddButton}>
                        <Text style={styles.addButtonTitle}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/*Begin chat box, figure out some way to add and subtract these as new convos begin and old ones are deleted, and figure out how to build them with inputted fields*/}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Name</Text>
                                    <Text style={styles.buttonSubtitle}>Preview</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        {/*End chat box*/}
                        {/*example chat boxes V*/}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Joel Ritter</Text>
                                    <Text style={styles.buttonSubtitle}>Ocean Man, take me by the hand t...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Aaron Congo</Text>
                                    <Text style={styles.buttonSubtitle}>ake me to the land, that you unders...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Connor Fong</Text>
                                    <Text style={styles.buttonSubtitle}>tand. Ocean man, the voyage to th...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Sammy Brache</Text>
                                    <Text style={styles.buttonSubtitle}>e corner of the globe is a real trip ...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressButton} onLongPress={this._onLongPressButton}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>CPEN 321 Study Group</Text>
                                    <Text style={styles.buttonSubtitle}>Ocean man, the crust of a tan man ...</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        {/*example chat boxes ^*/}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButtonContainer: {
        height: 45,
        width: 60,
        top: 15,
        left: 311,
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
    },
    addButtonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#019898',
    },
    scrollContainer: {
        flex: 7,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        height: 100,
        margin: 3,
        top: 10,
        bottom: 10,
    },
    button: {
        backgroundColor: '#019898',
    },
    buttonTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 15,
        color: 'white'
    },
    buttonSubtitle: {
        fontSize: 18,
        textAlign: 'left',
        margin: 10,
        bottom: 12,
        color: 'white'
    },
    whiteSpace: {
         height: 10,
    }
});
