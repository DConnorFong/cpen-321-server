export default function(spec) {
    spec.describe('Attempting to log in with valid credential', function() {
        spec.it('progresses the user past the login page', async function() {
            await spec.fillIn('LoginForm.email', 'Aaron');
            await spec.fillIn('LoginForm.password', 'Congo');
            await spec.press('LoginForm.loginBtn');
            await spec.exists('Group.searchBtn');
        });
    });
}
