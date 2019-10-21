import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity, StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import Chatroom from './Chatroom'

enum ChatViews {
    chat = 0,
    chatroom,
}

interface ChatProps {HandleChatroomOpen: Function;
                     HandleChatroomClose: Function;}

export default class Chat extends Component<ChatProps> {
    constructor(props: any) {
        super(props);
        this.OnPressButton = this.OnPressButton.bind(this);
        this.OnLongPressButton = this.OnLongPressButton.bind(this);
        this.HandleChatroomReturn = this.HandleChatroomReturn.bind(this);
    }

    state = { chatNav: ChatViews.chat };

    OnPressButton() {
        {/*open chatroom Here*/}
        this.setState({chatNav: ChatViews.chatroom})
        this.props.HandleChatroomOpen()
        return
    }
    OnLongPressButton()
    {
        {/*open chatroom Here*/}
        this.setState({chatNav: ChatViews.chatroom})
        this.props.HandleChatroomOpen()
        return
    }
    HandleChatroomReturn() {
        this.setState({chatNav: ChatViews.chat})
        this.props.HandleChatroomClose()
        return
    }
    ShowChatViews(view: any) {
        switch (view) {
            case ChatViews.chat:
                return this.ChatMainView();
            case ChatViews.chatroom:
                return <Chatroom OnPressBackButton={this.HandleChatroomReturn.bind(this)} />;
            default:
                return this.ChatMainView();
        }
    }
    ChatMainView() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Messages</Text>
                </View>
                <View style={styles.scrollContainer}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/*Begin chat box, figure out some way to add and subtract these as new convos begin and old ones are deleted, and figure out how to build them with inputted fields*/}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.OnPressButton.bind(this)}
                                              onLongPress={this.OnLongPressButton.bind(this)}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonTitle}>Name</Text>
                                    <Text style={styles.buttonSubtitle}>Preview</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.whiteSpace}></View>
                        {/*End chat box*/}
                    </ScrollView>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.ShowChatViews(this.state.chatNav)}
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
        top: 6,
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
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
