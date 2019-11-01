import React, { Component } from 'react';
import { View } from 'react-native';
import { appStyles } from './src/styles/app';
import Login from './src/components/Login/Login';
import Navbar from './src/components/Navbar/Navbar';
import Chat from './src/components/Chat/Chat';
import Group from './src/components/Group/Group';
import Schedule from './src/components/Schedule/Schedule';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';
import { viewEnum } from './src/enum/viewEnum';

export default class App extends Component {
    constructor(props: any) {
        super(props);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.HandleSuccessfulLogin = this.HandleSuccessfulLogin.bind(this);
    }

    state = { navigator: viewEnum.login, navBarEnable: true, userID: '' };

    ShowMainView(view: any) {
        switch (view) {
            case viewEnum.login:
                return (
                    <Login HandleSuccessfulLogin={this.HandleSuccessfulLogin} />
                );
            case viewEnum.chat:
                return <Chat toggleNavBar={this.toggleNavBar} />;
            case viewEnum.schedule:
                return <Schedule userID={this.state.userID} />;
            case viewEnum.group:
                return <Group userID={this.state.userID} />;
            default:
                return null;
        }
    }

    ShowNavBar(showNav: any, navBarEnable: boolean) {
        if (showNav != viewEnum.login && navBarEnable) {
            return <Navbar handleViewChange={this.handleViewChange} />;
        }
        return null;
    }

    handleViewChange(view) {
        this.setState({ navigator: view });
    }

    toggleNavBar(active: boolean) {
        this.setState({ navBarEnable: active });
    }

    HandleSuccessfulLogin(id: String) {
        console.log('Handling Success');
        this.setState({ userID: id });
        this.handleViewChange(viewEnum.group);
        registerForPushNotificationsAsync(id);
        return;
    }

    render() {
        return (
            <View style={appStyles.container}>
                <View style={appStyles.viewContainer}>
                    {this.ShowMainView(this.state.navigator)}
                </View>
                {this.ShowNavBar(this.state.navigator, this.state.navBarEnable)}
            </View>
        );
    }
}
