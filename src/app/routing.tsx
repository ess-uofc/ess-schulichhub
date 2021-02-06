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

import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import app from '../Models/firebase';
import PropTypes from 'prop-types';

export const PrivateRoute: React.FC<{
    /**
     * @author Mohamad Abdel Rida
     * @param component -> The protected Component being routed to
     * @param path the path corresponding to the protected component
     * @param exact A boolean flag that toggles exact path matching
     */
    component: React.FC;
    path: string;
    exact: boolean;
}> = (props) => {
    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
    app.auth().onAuthStateChanged(function (user) {
        if (user) {
            setIsAuthed(true);
        } else {
            setIsAuthed(false);
        }
    });
    // unsubscribe();
    console.log(isAuthed);
    return isAuthed ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/login" exact={true} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
};
