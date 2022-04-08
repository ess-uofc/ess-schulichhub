import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterLanding from './pages/RegisterLanding';
import RegisterForm from './pages/RegisterForm';
import PostView from './pages/PostView';

/* Redux for User */
import { clearUser, setUser } from './features/User/UserStore';
import { useDispatch } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import { PrivateRoute } from './components/PrivateRoute';
import WritePostView from './pages/WritePost';
import TitleBar from './components/TitleBar';
import unProtectedRoutes from './app/routing';
import { FirebaseAuthService } from './services/FirebaseAuth.service';
import ProfileView from './pages/ProfileView';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unSubscribe = FirebaseAuthService.onAuthStateChange((user) => {
            if (user) {
                console.log('Signed in');
                dispatch(setUser(user)); // Push user to redux
                unProtectedRoutes.includes(location.pathname) ? (location.href = '/home') : console.log('At home');
            } else {
                dispatch(clearUser()); // Clear user from redux
                !unProtectedRoutes.includes(location.pathname) ? (location.href = '/login') : console.log('Safe');
            }
        });
        return () => {
            unSubscribe();
        };
    }, []);
    return (
        <IonApp>
            <IonReactRouter>
                <TitleBar />
                <IonRouterOutlet id="main">
                    <Route path="/landing" component={Landing} />
                    <PrivateRoute path="/home" component={Home} exact={true} />
                    <Route path="/post/:id" component={PostView} />
                    <Route path="/login" component={Login} exact={true} />
                    <Route path="/register" component={RegisterLanding} exact={true} />
                    <Route path="/emailRegister" component={RegisterForm} exact={true} />
                    <Route path="/writePost" component={WritePostView} exact={true} />
                    <Route path="/u/:uid" component={ProfileView} exact={true} />
                    <Route path="/" render={() => <Redirect to="/landing" />} exact={true} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
