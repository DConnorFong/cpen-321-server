import { StyleSheet } from 'react-native';

export const navbarStyles = StyleSheet.create({
    navbarContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#01a3a4',
        justifyContent: 'center',
    },
    navButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
    },
    navButtonTitle: {
        fontSize: 15,
        color: 'white',
    },
    navButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 11,
    },
    navButtonIconContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButtonTextContainer: {
        flex: 1,
        justifyContent: 'center',
        bottom: 7,
    },
});
