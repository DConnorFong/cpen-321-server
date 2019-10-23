import React, { Component } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    StatusBar,
} from 'react-native';
import Chatroom from './Chatroom';
import { genericStyles } from '../../styles/generic';

enum ChatViews {
    chat = 0,
    chatroom,
}

interface ChatProps {
    HandleChatroomOpen: Function;
    HandleChatroomClose: Function;
}

export default class Chat extends Component<ChatProps> {
    constructor(props: any) {
        super(props);
        this.OnPressButton = this.OnPressButton.bind(this);
        this.OnLongPressButton = this.OnLongPressButton.bind(this);
        this.HandleChatroomReturn = this.HandleChatroomReturn.bind(this);
    }

    state = { chatNav: ChatViews.chat };

    OnPressButton() {
        {
            /*open chatroom Here*/
        }
        this.setState({ chatNav: ChatViews.chatroom });
        this.props.HandleChatroomOpen();
        return;
    }
    OnLongPressButton() {
        {
            /*open chatroom Here*/
        }
        this.setState({ chatNav: ChatViews.chatroom });
        this.props.HandleChatroomOpen();
        return;
    }
    HandleChatroomReturn() {
        this.setState({ chatNav: ChatViews.chat });
        this.props.HandleChatroomClose();
        return;
    }
    ShowChatViews(view: any) {
        switch (view) {
            case ChatViews.chat:
                return this.ChatMainView();
            case ChatViews.chatroom:
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
                <View style={styles.scrollContainer}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {/*Begin chat box*/}
                        <TouchableOpacity
                            onPress={this.OnPressButton.bind(this)}
                            onLongPress={this.OnLongPressButton.bind(this)}
                            style={styles.buttonContainer}
                        >
                            <View style={styles.buttonTitleContainer}>
                                <Text style={styles.buttonTitle}>Name</Text>
                            </View>
                            <View style={styles.buttonSubtitleContainer}>
                                <Text style={styles.buttonSubtitle}>
                                    Preview
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.whiteSpace}></View>
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

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 7,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        backgroundColor: '#019898',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    buttonTitleContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    buttonTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
    },
    buttonSubtitleContainer: {
        flex: 2,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    buttonSubtitle: {
        fontSize: 18,
        textAlign: 'left',
        color: 'white',
    },
    whiteSpace: {
        height: 10,
    },
});
