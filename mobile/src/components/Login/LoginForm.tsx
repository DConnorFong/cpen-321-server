import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard,
} from 'react-native';
import { loginFormStyles } from '../../styles/loginForm';
import config from '../../../config/config';

const endpoint = config.endpoint;

interface ILoginFormProps {
    handleSuccessfulLogin: (id: string) => void;
}

interface ILoginFormState {
    username: string;
    password: string;
    errorMessage: string;
    forgotPasswordMessage: string;
}

export default class LoginForm extends Component<
    ILoginFormProps,
    ILoginFormState
> {
    private usernameInput: any;
    private passwordInput: any;

    constructor(props: ILoginFormProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            forgotPasswordMessage: '',
        };

        this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
        this.loginPress = this.loginPress.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    public render() {
        return (
            <View style={loginFormStyles.container}>
                <View style={loginFormStyles.errorContainer}>
                    <Text style={loginFormStyles.errorText}>
                        {this.state.errorMessage}
                    </Text>
                    <TouchableOpacity>
                        <Text style={loginFormStyles.forgotPasswordText}>
                            {this.state.forgotPasswordMessage}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="email"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={this.handleUsernameUpdate}
                    ref={input => (this.usernameInput = input)}
                    style={loginFormStyles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    returnKeyType="go"
                    secureTextEntry
                    onChangeText={this.handlePasswordUpdate}
                    ref={input => (this.passwordInput = input)}
                    style={loginFormStyles.input}
                />
                <TouchableOpacity
                    onPress={this.loginPress}
                    style={loginFormStyles.buttonContainer}
                >
                    <Text style={loginFormStyles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }

    private handleUsernameUpdate(input: any) {
        this.setState({
            username: input,
        });
    }

    private handlePasswordUpdate(input: any) {
        this.setState({
            password: input,
        });
    }

    private loginPress() {
        fetch(`${endpoint}/user/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.username,
                lastName: this.state.password,
            }),
        })
            .then(response => {
                if (response.ok) return response.json();
                else throw 'Error: invalid authentication';
            })
            .then(response => {
                this.setErrorMessage(false);
                // find id located in response['_id']
                this.props.handleSuccessfulLogin(response['_id']);
            })
            .catch(error => {
                this.setErrorMessage(true);
            });
    }

    private setErrorMessage(arg: any) {
        if (arg === true) {
            this.setState({
                errorMessage: 'Sorry! Your username or password was invalid.',
                forgotPasswordMessage: 'Forgot Password?',
            });
            Keyboard.dismiss();
            this.passwordInput.clear();
        } else {
            this.setState({
                errorMessage: '',
            });
        }
    }
}
