import React, { useEffect, useState } from 'react';
import app, { Auth, FirebaseUser } from '../Models/firebase';
import PropTypes from 'prop-types';
import Login from '../pages/Login';

type PrivateRouteTypes = {
    component: React.FC;
    path: string;
    exact: boolean;
    fallback?: React.FC;
};

/**
 * @author Mohamad Abdel Rida
 * @param component -> The protected Component being routed to
 * @param path the path corresponding to the protected component
 * @param exact A boolean flag that toggles exact path matching
 * @param fallback  The component to render if user is not allow to access
 * are allowed access to route
 */
export const PrivateRoute: React.FC<PrivateRouteTypes> = (props) => {
    const [condition, setCondition] = useState<boolean>();
    useEffect(() => {
        const unSubscribe = Auth.onAuthStateChange((user) => {
            setCondition(Boolean(user));
        });
        return unSubscribe;
    }, []);
    return condition ? <>{props.component({})}</> : <Login />;
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    fallback: PropTypes.func,
    exact: PropTypes.bool.isRequired,
};
