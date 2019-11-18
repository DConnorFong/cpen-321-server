export default function(spec) {
    spec.describe('Attempting to log in with invalid credentials', function() {
        spec.it(
            'denies authentication and keeps the user on the login page',
            async function() {
                await spec.fillIn('LoginForm.email', 'asdf');
                await spec.fillIn('LoginForm.password', 'jkl');
                await spec.press('LoginForm.loginBtn');
                await spec.exists('Login.screen');
            }
        );
    });
}
