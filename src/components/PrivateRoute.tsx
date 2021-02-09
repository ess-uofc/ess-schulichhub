import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import app from '../Models/firebase';
import PropTypes from 'prop-types';
import { loadingComponent } from './Loading';

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

    const [authed, setAuthed] = useState<boolean | null>();
    app.auth().onAuthStateChanged(function (user) {
        setAuthed(Boolean(user));
        setLoading(authed == null);
    });

    console.log(authed);
    const loadedComponent = authed ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/login" exact={true} />
    );
    return loading ? loadingComponent : loadedComponent;
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
};
