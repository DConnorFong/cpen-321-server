import { StyleSheet } from 'react-native';

export const navbarBaseColor = '#444444';

export const navbarActiveColor = '#947BD3';

// equivalent to #947BD3 with transparency
export const navbarHighlightColor = 'rgba(148,123,221,0.1)';

const navbarBorderColor = '#AAAAAA';

export const navbarStyles = StyleSheet.create({
    navbarContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderTopColor: navbarBorderColor,
        borderTopWidth: 1,
    },
    navButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        height: 50,
        borderRadius: 15,
    },
    navButtonText: {
        textAlign: 'center',
        fontSize: 11,
        top: 5,
    },
    navButtonIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 2,
        top: 2,
    },
    navButtonTextContainer: {
        flex: 1,
        justifyContent: 'center',
        bottom: 10,
    },
});
