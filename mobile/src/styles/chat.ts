import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
    scrollContainer: {
        flex: 7,
        backgroundColor: 'white',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        backgroundColor: '#019898',
        marginHorizontal: 10,
        borderRadius: 10,
    },
    buttonTitleContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    buttonTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
    },
    buttonSubtitleContainer: {
        flex: 2,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    buttonSubtitle: {
        fontSize: 18,
        textAlign: 'left',
        color: 'white',
    },
    whiteSpace: {
        height: 10,
    },
});
