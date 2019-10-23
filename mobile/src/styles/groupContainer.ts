import { StyleSheet } from 'react-native';

export const groupContainerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#01a3a4',
        justifyContent: 'flex-start',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    groupName: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    groupMember: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 3,
    },
});
