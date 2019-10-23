import { StyleSheet } from 'react-native';

export const genericStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 50,
        backgroundColor: '#01a3a4',
        marginBottom: 15,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    title: {
        color: '#01a3a4',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    titleContainer: {
        alignItems: 'center',
    },
});
