import { StyleSheet } from 'react-native';

export const chatroomStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2.9,
        zIndex: 1,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        position: 'absolute',
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButtonContainer: {
        height: 45,
        width: 60,
        top: 18,
        left: 12,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    backButtonTitle: {
        fontSize: 17,
        color: '#019898',
    },
    scrollContainer: {
        flex: 14,
        backgroundColor: 'white',
    },
    contentContainer: {},
    input: {
        height: 40,
        margin: 40,
        right: 32,
        bottom: 30,
        color: 'black',
        backgroundColor: 'white',
    },
    outgoingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 8,
        alignItems: 'flex-start',
        backgroundColor: '#019898',
    },
    incomingMessageBox: {
        height: 'auto',
        width: 210,
        margin: 5,
        padding: 8,
        alignItems: 'flex-start',
        backgroundColor: '#a6a6a6',
    },
    incomingMessageContainer: {
        flexDirection: 'row',
    },
    outgoingMessageContainer: {
        flexDirection: 'row-reverse',
    },
    messageSender: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    },
    messageText: {
        fontSize: 12,
        color: 'white',
    },
    sendButtonContainer: {
        left: 311,
        width: 50,
        height: 40,
        bottom: 71,
        position: 'absolute',
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#019898',
    },
    bottomContainer: {
        margin: 0,
        height: 60,
        backgroundColor: '#d3d3d3',
    },
    whitespace: {
        flex: 0,
    },
});
