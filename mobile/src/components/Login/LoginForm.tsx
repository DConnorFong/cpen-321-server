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
import globals from '../../globals';

const endpoint = globals.endpoint;

interface LoginFormProps {
    HandleSuccessfulLogin: Function;
}

interface LoginFormState {
    username: String;
    password: String;
    errorMessage: String;
    forgotPasswordMessage: String;
}

export default class LoginForm extends Component<
    LoginFormProps,
    LoginFormState
> {
    constructor(props: LoginFormProps) {
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

    usernameInput: any;
    passwordInput: any;

    render() {
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

    handleUsernameUpdate(input: any) {
        this.setState({
            username: input,
        });
    }

    handlePasswordUpdate(input: any) {
        this.setState({
            password: input,
        });
    }

    loginPress() {
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
                this.props.HandleSuccessfulLogin(response['_id']);
            })
            .catch(error => {
                this.setErrorMessage(true);
            });
    }

    setErrorMessage(arg: any) {
        if (arg == true) {
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
