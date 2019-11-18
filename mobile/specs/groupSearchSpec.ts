import { hasAGroup } from './helpers';

export default function(spec) {
    spec.describe('Searching for a group', function() {
        spec.it(
            'correctly displays the new group to the user',
            async function() {
                await spec.exists('Navbar.Group');
                await spec.press('Navbar.Group');
                await spec.press('Group.searchBtn');
                await spec.pause(3000);
                const groupList = await spec.findComponent('Group.groupList');
                await hasAGroup(groupList);
            }
        );
    });
}
