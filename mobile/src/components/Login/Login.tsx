import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { loginGradient, loginStyles } from '../../styles/login';
import LoginForm from './LoginForm';
import { hook } from 'cavy';

interface ILoginProps {
    handleSuccessfulLogin: (id: string) => void;
}

class Login extends Component<ILoginProps, {}> {
    constructor(props: ILoginProps) {
        super(props);
    }

    public render() {
        return (
            <LinearGradient
                colors={loginGradient}
                style={{
                    flex: 1,
                }}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={loginStyles.container}
                    ref={this.props.generateTestHook('Login.screen')}
                >
                    <View style={loginStyles.logoContainer}>
                        <View style={loginStyles.logoLine}>
                            <Text style={loginStyles.title}>StudentLink</Text>
                            <Ionicons
                                style={loginStyles.iconTitle}
                                name="ios-school"
                                size={45}
                                color="white"
                            />
                        </View>
                        <View>
                            <Text style={loginStyles.titleTwo}>
                                Swiftly Study with Students
                            </Text>
                        </View>
                    </View>
                    <View>
                        <LoginForm
                            handleSuccessfulLogin={
                                this.props.handleSuccessfulLogin
                            }
                        />
                    </View>
                </KeyboardAvoidingView>
                <TouchableOpacity style={loginStyles.buttonContainer2}>
                    <Text style={loginStyles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const TestableLogin = hook(Login);
export default TestableLogin;
