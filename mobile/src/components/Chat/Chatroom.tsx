import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    StatusBar,
} from 'react-native';
import { chatroomStyles } from '../../styles/chatroom';

interface ChatroomProps {
    OnPressBackButton: Function;
}

export default class Chatroom extends Component<ChatroomProps> {
    sstate = { message: '' };

    _onPressSendButton() {
        {
            /*send message*/
        }
        alert('send message');
        return;
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={chatroomStyles.container}
            >
                <StatusBar barStyle="dark-content" />
                <View style={chatroomStyles.topContainer}>
                    <View style={chatroomStyles.titleContainer}>
                        <Text style={chatroomStyles.title}>Group Name</Text>
                    </View>
                </View>
                <View style={chatroomStyles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={this.props.OnPressBackButton.bind(this)}
                    >
                        <Text style={chatroomStyles.backButtonTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={chatroomStyles.whitespace}></View>
                <View style={chatroomStyles.scrollContainer}>
                    <ScrollView
                        contentContainerStyle={chatroomStyles.contentContainer}
                    >
                        {/*incoming message begin*/}
                        <View style={chatroomStyles.incomingMessageContainer}>
                            <View style={chatroomStyles.incomingMessageBox}>
                                <Text style={chatroomStyles.messageSender}>
                                    Name
                                </Text>
                                <Text style={chatroomStyles.messageText}>
                                    Message
                                </Text>
                            </View>
                        </View>
                        {/*incoming message end*/}
                        {/*outgoing message begin*/}
                        <View style={chatroomStyles.outgoingMessageContainer}>
                            <View style={chatroomStyles.outgoingMessageBox}>
                                <Text style={chatroomStyles.messageText}>
                                    Message
                                </Text>
                            </View>
                        </View>
                        {/*outgoing message end*/}
                    </ScrollView>
                </View>
                <View style={chatroomStyles.bottomContainer}>
                    <ScrollView scrollEnabled={false}>
                        <TextInput
                            style={chatroomStyles.input}
                            multiline={true}
                        />
                        <View style={chatroomStyles.sendButtonContainer}>
                            <TouchableOpacity onPress={this._onPressSendButton}>
                                <Text style={chatroomStyles.sendButtonText}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
