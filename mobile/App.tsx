import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login/Login';
import Navbar from './src/components/Navbar/Navbar';
import Chat from './src/components/Chat/Chat';

enum Navigation {
    login = 0,
    chat,
    schedule,
    search,
}

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.HandleNavButtonSearch = this.HandleNavButtonSearch.bind(this);
        this.HandleNavButtonSch = this.HandleNavButtonSch.bind(this);
        this.HandleNavButtonChat = this.HandleNavButtonChat.bind(this);
        this.HandleChatroomOpen = this.HandleChatroomOpen.bind(this);
        this.HandleChatroomClose = this.HandleChatroomClose.bind(this);
    }
    state = { navigator: Navigation.chat, navBarEnable: true};

    ShowMainView(view: any) {
        switch (view) {
            case Navigation.login:
                return <Login />;
            case Navigation.chat:
                return <Chat HandleChatroomOpen={this.HandleChatroomOpen}
                             HandleChatroomClose={this.HandleChatroomClose}
                        />;
            case Navigation.schedule:
                {/*return <Schedule />; */}
                return null;
            case Navigation.search:
                {/*return <Search />; */}
                return null;
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
        this.setState({navigator: Navigation.search})
        return;
    }
    HandleNavButtonSch() {
        this.setState({navigator: Navigation.schedule})
        return;
    }
    HandleNavButtonChat() {
        this.setState({navigator: Navigation.chat})
        return;
    }
    HandleChatroomOpen() {
        this.setState({navBarEnable: false})
        return
    }
    HandleChatroomClose() {
        this.setState({navBarEnable: true})
        return
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
