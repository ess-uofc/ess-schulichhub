const authRoutes = ['/login', '/register', '/emailregister', '/passwordreset'];

/**
 * @author Mohamad Abdel Rida
 * Redirects user to Home/Login based on their current location page
 */
export function redirectAfterAuthEvent(target: string): void {
    if (target == '/login') {
        !authRoutes.includes(window.location.pathname) ? (location.href = target) : console.log('Already at target');
    } else {
        authRoutes.includes(window.location.pathname) ? (location.href = target) : console.log('Already at target');
    }
}
export default authRoutes;
