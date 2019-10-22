import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/Login';
import Navbar from './src/components/Navbar/Navbar';
import Chat from './src/components/Chat/Chat';
import Group from './src/components/Group/Group';
import Schedule from './src/components/Schedule/Schedule';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';

enum Navigation {
    login = 0,
    chat,
    schedule,
    group,
}

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.HandleNavButtonSearch = this.HandleNavButtonSearch.bind(this);
        this.HandleNavButtonSch = this.HandleNavButtonSch.bind(this);
        this.HandleNavButtonChat = this.HandleNavButtonChat.bind(this);
        this.HandleChatroomOpen = this.HandleChatroomOpen.bind(this);
        this.HandleChatroomClose = this.HandleChatroomClose.bind(this);
        this.HandleSuccessfulLogin = this.HandleSuccessfulLogin.bind(this);
    }

    state = { navigator: Navigation.login, navBarEnable: true, userID: '' };

    ShowMainView(view: any) {
        switch (view) {
            case Navigation.login:
                return (
                    <Login HandleSuccessfulLogin={this.HandleSuccessfulLogin} />
                );
            case Navigation.chat:
                return (
                    <Chat
                        HandleChatroomOpen={this.HandleChatroomOpen}
                        HandleChatroomClose={this.HandleChatroomClose}
                    />
                );
            case Navigation.schedule:
                return <Schedule userID={this.state.userID} />;
            case Navigation.group:
                return <Group userID={this.state.userID} />;
            default:
                return null;
        }
    }
    ShowNavBar(showNav: any, navBarEnable: boolean) {
        if (showNav != Navigation.login && navBarEnable) {
            return (
                <Navbar
                    OnPressNavButtonSearch={this.HandleNavButtonSearch}
                    OnPressNavButtonSch={this.HandleNavButtonSch}
                    OnPressNavButtonChat={this.HandleNavButtonChat}
                />
            );
        }
        return null;
    }
    HandleNavButtonSearch() {
        this.setState({ navigator: Navigation.group });
        return;
    }
    HandleNavButtonSch() {
        this.setState({ navigator: Navigation.schedule });
        return;
    }
    HandleNavButtonChat() {
        this.setState({ navigator: Navigation.chat });
        return;
    }
    HandleChatroomOpen() {
        this.setState({ navBarEnable: false });
        return;
    }
    HandleChatroomClose() {
        this.setState({ navBarEnable: true });
        return;
    }
    HandleSuccessfulLogin(id: String) {
        this.setState({ userID: id });
        this.setState({ navigator: Navigation.group });
        registerForPushNotificationsAsync(id);
        return;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    {this.ShowMainView(this.state.navigator)}
                </View>
                {this.ShowNavBar(this.state.navigator, this.state.navBarEnable)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 8,
    },
});
