import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class Login extends Component {
    passwordInput: any;
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput
                    placeholder="email"
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style={styles.input} />
                <TextInput
                    placeholder="password"
                    placeholderTextColor='rgba(255,255,255,0.4)'
                    returnKeyType="go"
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    style={styles.input} />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
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
    }
});
