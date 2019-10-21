import * as request from 'request';
const endpoint = process.env.EXPO_PUSH_NOTIFICATION_SERVER;

/*
 * A library for sending a push notification through the Expo API
 *
 * Currently only supports iOS devices (does not implement FCM requirements set by Google and Android)
 */

/*
 * userList: a list of user push tokens within the study group
 * userNew: a name of the user joining the study group
 *
 * sends a push notification to all members in a StudentLink study group when a
 * new member joins
 */
export const pushUserJoinedGroup = async (userTokens, userNew) => {
    let options = {};

    userTokens.forEach(token => {
        options = {
            url: endpoint,
            headers: pushHeaders,
            body: JSON.stringify(
                buildPushNotification(
                    token,
                    `A new user ${userNew} has joined your study group`
                )
            ),
        };

        request.post(options, (err, res) => {
            if (err) {
                console.log(
                    `Error sending UserJoinedGroup push notification: ${err}`
                );
            }
        });
    });
};

/*
 * userId: target for StudentLink test push notification
 *
 * sends a test push notification to a registered user in the StudentLink
 */
export const pushTest = async userToken => {
    const options = {
        url: endpoint,
        headers: pushHeaders,
        body: JSON.stringify(
            buildPushNotification(
                userToken,
                'This is a test push notification.'
            )
        ),
    };

    request.post(options, (err, res) => {
        if (err) {
            console.log(`Error sending Test push notification: ${err}`);
        }
    });
};

/*
 * Expo defined push notification headers
 */
const pushHeaders = {
    host: 'exp.host',
    accept: 'application/json',
    'accept-encoding': 'gzip, deflate',
    'content-type': 'application/json',
};

/*
 * pushTo: user Expo push notification token
 * pushBody: push notification message
 *
 * a helper method that builds a push notification JSON body
 */
const buildPushNotification = (pushTo, pushBody) => {
    const body = {
        to: pushTo,
        sound: 'default',
        title: 'StudentLink',
        body: pushBody,
    };

    return body;
};
