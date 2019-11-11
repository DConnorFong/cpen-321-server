import React, { Component } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    ScrollView,
} from 'react-native';
import Chatroom from './Chatroom';
import { genericStyles } from '../../styles/generic';
import { chatStyles } from '../../styles/chat';
import { chatEnum } from '../../enum/chatEnum';

interface ChatProps {
    toggleNavBar: Function;
}

export default class Chat extends Component<ChatProps> {
    constructor(props: any) {
        super(props);
        this.OnPressButton = this.OnPressButton.bind(this);
        this.HandleChatroomReturn = this.HandleChatroomReturn.bind(this);
    }

    state = { chatNav: chatEnum.chat };

    OnPressButton() {
        {
            /*open chatroom Here*/
        }
        this.setState({ chatNav: chatEnum.chatroom });
        this.props.toggleNavBar(false);
        return;
    }
    HandleChatroomReturn() {
        this.setState({ chatNav: chatEnum.chat });
        this.props.toggleNavBar(true);
        return;
    }
    ShowChatViews(view: any) {
        switch (view) {
            case chatEnum.chat:
                return this.ChatMainView();
            case chatEnum.chatroom:
                return (
                    <Chatroom
                        OnPressBackButton={this.HandleChatroomReturn.bind(this)}
                    />
                );
            default:
                return this.ChatMainView();
        }
    }
    ChatMainView() {
        return (
            <SafeAreaView style={genericStyles.container}>
                <View style={genericStyles.titleContainer}>
                    <Text style={genericStyles.title}>Messages</Text>
                </View>
                <View style={chatStyles.scrollContainer}>
                    <ScrollView
                        contentContainerStyle={chatStyles.contentContainer}
                    >
                        {/*Begin chat box*/}
                        <TouchableOpacity
                            onPress={this.OnPressButton.bind(this)}
                            onLongPress={this.OnPressButton.bind(this)}
                            style={chatStyles.buttonContainer}
                        >
                            <View style={chatStyles.buttonTitleContainer}>
                                <Text style={chatStyles.buttonTitle}>Name</Text>
                            </View>
                            <View style={chatStyles.buttonSubtitleContainer}>
                                <Text style={chatStyles.buttonSubtitle}>
                                    Preview
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={chatStyles.whiteSpace}></View>
                        {/*End chat box*/}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    render() {
        return (
            <View style={genericStyles.container}>
                {this.ShowChatViews(this.state.chatNav)}
            </View>
        );
    }
}
