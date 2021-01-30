export const unAuthedRoutes = ['/landing', '/login', '/register', '/emailregister', '/passwordreset'];

/**
 * @author Mohamad Abdel Rida
 * Redirects user to Home/Login based on their current location page
 */
export default function redirectAfterAuthEvent(target: string): void {
    if (target == '/login') {
        !unAuthedRoutes.includes(window.location.pathname)
            ? (location.href = target)
            : console.log('Already at target');
    } else {
        unAuthedRoutes.includes(window.location.pathname) ? (location.href = target) : console.log('Already at target');
    }
}
