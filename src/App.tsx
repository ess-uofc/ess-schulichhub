import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipseOutline, homeOutline, logOutOutline } from 'ionicons/icons';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterLanding from './pages/RegisterLanding';
import RegisterForm from './pages/RegisterForm';
import Post from './pages/Post';

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
import app from './Models/firebase';
import User from './Models/User';

const App: React.FC = () => {
    /**
     * @author Mohamad Abdel Rida
     * Redirects user to login page
     */
    function redirectToLogin() {
        window.location.pathname !== '/login'
            ? (window.location.href = '/login')
            : console.log('Already on log in page');
    }

    /**
     * @author Mohamad Abdel Rida
     * Redirects user to login page
     */
    function redirectToHome() {
        window.location.pathname === '/login' ? (window.location.href = '/home') : console.log('Already on home page');
    }

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            /**
             * @author Mohamad Rida
             * @param user Firebase User
             * Redirects user to login page on top level
             * Once an auth state change has occurred
             */
            if (user) {
                console.log(user);
                redirectToHome();
                // Redirect User here if they are logged in
                // window.history.replaceState({},'','/home')
            } else {
                console.log('Redirecting User');
                redirectToLogin();
            }
        });
    }, []);
    return (
        <IonApp>
            <IonReactRouter>
                <IonMenu side="start" content-id="main">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonMenuToggle>
                                <IonItem routerLink="/home">
                                    <IonIcon icon={homeOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Home</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/landing">
                                    <IonIcon icon={ellipseOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Landing</IonLabel>
                                </IonItem>
                                <IonItem onClick={() => User.signOut()}>
                                    <IonIcon icon={logOutOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Sign Out</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonList>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id="main">
                    <Route path="/landing" component={Landing} />
                    <Route path="/home" component={Home} />
                    <Route path="/post" component={Post} />
                    <Route path="/login" component={Login} exact={true} />
                    <Route path="/register" component={RegisterLanding} exact={true} />
                    <Route path="/emailRegister" component={RegisterForm} exact={true} />
                    <Route path="/" render={() => <Redirect to="/landing" />} exact={true} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
