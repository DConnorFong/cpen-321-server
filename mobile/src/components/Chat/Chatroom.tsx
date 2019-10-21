import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';

interface ChatroomProps {OnPressBackButton: Function;}

export default class Chatroom extends Component<ChatroomProps> {

    sstate = {message: ''}

    _onPressSendButton() {
        {/*send message*/}
        alert("send message")
        return
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.topContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Group Name</Text>
                    </View>
                </View>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={this.props.OnPressBackButton.bind(this)}>
                        <Text style={styles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.whitespace}></View>
                <View style={styles.scrollContainer}>
                    <ScrollView contentContainerStyle={styles.contentContainer}
                                ref={ref => {this.scrollView = ref}}
                                onContentSizeChange={(contentWidth, contentHeight)=>{this.refs.scrollView.scrollToEnd({animated: false});}}>
                        {/*incoming message begin*/}
                        <View style={styles.incomingMessageContainer}>
                            <View style={styles.incomingMessageBox}>
                                <Text style={styles.messageSender}>Name</Text>
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
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2.9,
        zIndex: 1,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        position: 'absolute',
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
        top: 18,
        left: 12,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 2,
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
        alignItems: 'flex-start',
        backgroundColor: '#019898',
    },
    incomingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 8,
        alignItems: 'flex-start',
        backgroundColor: '#a6a6a6',
    },
    incomingMessageContainer: {
        flexDirection: 'row',
    },
    outgoingMessageContainer: {
        flexDirection: 'row-reverse',
    },
    messageSender: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white'
    },
    messageText: {
        fontSize: 12,
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
      flex: 0,
    },
});
