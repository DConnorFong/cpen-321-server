import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';

export default class Chatroom extends Component {
    state = {message: ''}
    onChangeText=message => this.setState({message});
    _onPressBackButton() {
        {/*return to previous view here*/}
        alert('Return to Chat View')
        return
    }
    _onPressSendButton() {
        {/*send message*/}
        alert("send message")
        return
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Name</Text>
                </View>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={this._onPressBackButton}>
                        <Text style={styles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.whitespace}></View>
                <View style={styles.scrollContainer}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/*example messages V*/}
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Long message 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789</Text>
                            </View>
                        </View>
                         <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        {/*example messages ^*/}
                        {/*incoming message begin*/}
                        <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        {/*incoming message end*/}
                        {/*outgoing message begin*/}
                        <View style={styles.outgoingMessageContainer}>
                            <View style={styles.outgoingMessageBox}>
                                <Text style={styles.messageText}>Message</Text>
                            </View>
                        </View>
                        {/*outgoing message end*/}
                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <ScrollView scrollEnabled={false}>
                        <TextInput
                            style={styles.input}
                            placeHolder="Message"
                            placeholderTextColor='black'
                            returnKeyType='return'
                            onChangeText={this.onChangeText}
                            value={this.state.message}
                            multiline={true}
                        />
                        <View style={styles.sendButtonContainer}>
                            <TouchableOpacity onPress={this._onPressSendButton}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        postion: 'absolute',
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButtonContainer: {
        height: 45,
        width: 60,
        top: 15,
        left: 15,
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
    },
    backButtonTitle: {
        fontSize: 17,
        color: '#019898',
    },
    scrollContainer: {
        flex: 14,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        margin: 40,
        right: 32,
        bottom: 30,
        color: 'black',
        backgroundColor: 'white',
    },
    outgoingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 8,
        alignItems: 'left',
        backgroundColor: '#019898',
    },
    incomingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 8,
        alignItems: 'left',
        backgroundColor: '#a6a6a6',
    },
    incomingMessageContainer: {
        flexDirection: 'row',
    },
    outgoingMessageContainer: {
        flexDirection: 'row-reverse',
    },
    messageText: {
        fontSize: '12',
        color: 'white',
    },
    sendButtonContainer: {
        left: 311,
        width: 50,
        height: 40,
        bottom: 71,
        position: 'absolute',
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#019898',
    },
    bottomContainer: {
      margin: 0,
      height: 60,
      backgroundColor: '#d3d3d3',
    },
    whitespace: {
      flex: 1,
    },
});
