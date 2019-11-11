import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import config from '../../config/config';

const PUSH_ENDPOINT = config.endpoint;

const PUSH_ROUTE = '/push_notification';

export default async function registerForPushNotificationsAsync(_id: String) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // TODO: add error logging here
    // console.log(`Token: ${token}`);
    // console.log(`Endpoint: ${PUSH_ENDPOINT}${_id}${PUSH_ROUTE}`);

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(`${PUSH_ENDPOINT}${_id}${PUSH_ROUTE}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            },
        }),
    });
}
