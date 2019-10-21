import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';

// TODO: find a way to clean this up
const endpoint = 'http://ec2-18-222-96-240.us-east-2.compute.amazonaws.com';

interface LoginFormProps {
    authenticateUserId: Function;
    HandleSuccessfulLogin: Function;
}

interface LoginFormState {
    username: String;
    password: String;
    errorMessage: String;
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
            <View style={styles.container}>
                <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                <TextInput
                    placeholder="email"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={this.handleUsernameUpdate}
                    ref={input => (this.usernameInput = input)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    returnKeyType="go"
                    secureTextEntry
                    onChangeText={this.handlePasswordUpdate}
                    ref={input => (this.passwordInput = input)}
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={this.loginPress}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
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
                this.props.HandleSuccessfulLogin(response['_id'])
                // TODO: pass handler to App.tsx
            })
            .catch(error => {
                this.setErrorMessage(true);
            });
    }

    setErrorMessage(arg: any) {
        if (arg == true) {
            this.setState({
                errorMessage:
                    'Sorry! Your username or password was invalid, please try again!',
            });
            this.usernameInput.focus();
            this.usernameInput.clear();
            this.passwordInput.clear();
        } else {
            this.setState({
                errorMessage: '',
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#019898',
        paddingVertical: 15,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    errorText: {
        color: '#FFFFFF',
        paddingVertical: 25,
        textAlign: 'center',
    },
});
