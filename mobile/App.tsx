import React, { Component } from 'react';
import { View } from 'react-native';
import { appStyles } from './src/styles/app';
import Login from './src/components/Login/Login';
import Navbar from './src/components/Navbar/Navbar';
import Chat from './src/components/Chat/Chat';
import Group from './src/components/Group/Group';
import Schedule from './src/components/Schedule/Schedule';
import Settings from './src/components/Settings/Settings';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotificationsAsync';
import { viewEnum } from './src/enum/viewEnum';

interface IAppState {
    navigator: number;
    navBarEnable: boolean;
    userID: string;
}

export default class App extends Component<{}, IAppState> {
    constructor(props: any) {
        super(props);

        this.handleViewChange = this.handleViewChange.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);

        this.state = {
            navigator: viewEnum.login,
            navBarEnable: true,
            userID: '',
        };
    }

    public render() {
        return (
            <View style={appStyles.container}>
                <View style={appStyles.viewContainer}>
                    {this.showMainView(this.state.navigator)}
                </View>
                {this.showNavBar(this.state.navigator, this.state.navBarEnable)}
            </View>
        );
    }

    public handleViewChange(view) {
        this.setState({ navigator: view });
    }

    public toggleNavBar(active: boolean) {
        this.setState({ navBarEnable: active });
    }

    public handleSuccessfulLogin(id: string) {
        this.setState({ userID: id });
        this.handleViewChange(viewEnum.group);
        registerForPushNotificationsAsync(id);
        return;
    }

    private showMainView(view: any) {
        switch (view) {
            case viewEnum.login:
                return (
                    <Login handleSuccessfulLogin={this.handleSuccessfulLogin} />
                );
            case viewEnum.chat:
                return <Chat toggleNavBar={this.toggleNavBar} />;
            case viewEnum.schedule:
                return <Schedule userID={this.state.userID} />;
            case viewEnum.group:
                return <Group userID={this.state.userID} />;
            case viewEnum.settings:
                return <Settings userID={this.state.userID} />;
            default:
                return null;
        }
    }

    private showNavBar(showNav: any, navBarEnable: boolean) {
        if (showNav !== viewEnum.login && navBarEnable) {
            return <Navbar handleViewChange={this.handleViewChange} />;
        }
        return null;
    }
}
