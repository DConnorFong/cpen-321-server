import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';

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
    }
    state = { navigator: Navigation.chat };

    ShowMainView(props: any) {
        const view = props.view;
        switch (view) {
            case Navigation.login:
                return <Login />;
            case Navigation.chat:
                return <Chat />;
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
    ShowNavBar(props: any) {
        const showNav = props.showNav;
        if (showNav != Navigation.login) {
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
    HandleNavButtonSearch = () => {
        alert('Navbutton press => change to search view');
        return;
    }
    HandleNavButtonSch() {
        alert('Navbutton press => change to sch view');
        return;
    }
    HandleNavButtonChat() {
        alert('Navbutton press => change to chat view');
        return;
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.viewContainer}>
              <this.ShowMainView view={this.state.navigator} />
            </View>
            <this.ShowNavBar showNav={this.state.navigator} />
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
