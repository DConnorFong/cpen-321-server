import { hasCourses } from './helpers';

export default function(spec) {
    spec.describe('Refreshing courses', function() {
        spec.it('displays a list of courses', async function() {
            await spec.exists('Navbar.Schedule');
            await spec.press('Navbar.Schedule');
            await spec.exists('Schedule.refreshCoursesBtn');
            await spec.press('Schedule.refreshCoursesBtn');
            await spec.pause(3000);
            const groupList = await spec.findComponent('Schedule.courseList');
            await hasCourses(groupList);
        });
    });
}
