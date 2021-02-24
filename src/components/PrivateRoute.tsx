import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import app from '../Models/firebase';
import PropTypes from 'prop-types';
import { loadingComponent } from './Loading';
import Login from '../pages/Login';

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
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticatedState] = useState<boolean | null>();
    console.log('Authenticated');

    useEffect(() => {
        const unSubscribe = app.auth().onAuthStateChanged(function (user) {
            setAuthenticatedState(Boolean(user));
            setLoading(authenticated == null);
        });
        console.log('Authenticated');
        return () => {
            unSubscribe();
        };
    }, [authenticated]);

    function handleAuthState() {
        if (authenticated) {
            return <Route path={props.path} exact={props.exact} component={props.component} />;
        } else if (loading) {
            return loadingComponent;
        } else {
            return <Login />;
        }
    }
    return handleAuthState();
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
};
