import React from 'react';
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
import { homeOutline, logInOutline } from 'ionicons/icons';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterLanding from './pages/RegisterLanding';
import RegisterForm from './pages/RegisterForm';

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

const App: React.FC = () => (
    <IonApp>
        <div className="navBar">
            <IonMenu side="start" content-id="main">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem routerLink="/Landing">
                            <IonIcon icon={homeOutline} size="small" class="ion-padding"></IonIcon>
                            <IonLabel>Landing (Dev)</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/Home">
                            <IonIcon icon={homeOutline} size="small" class="ion-padding"></IonIcon>
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/login">
                            <IonIcon icon={logInOutline} size="small" class="ion-padding"></IonIcon>
                            <IonLabel>Login</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
        </div>
        <IonReactRouter>
            <div className="navBar">
                <IonMenu side="start" content-id="main">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonMenuToggle>
                                <IonItem routerLink="/Home">
                                    <IonIcon icon={homeOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Home</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/login">
                                    <IonIcon icon={logInOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Login</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/tab1">
                                    <IonIcon icon={ellipseOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Tab 1</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/tab2">
                                    <IonIcon icon={squareOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Tab 2</IonLabel>
                                </IonItem>
                                <IonItem routerLink="/tab3">
                                    <IonIcon icon={triangleOutline} size="small" class="ion-padding"></IonIcon>
                                    <IonLabel>Tab 3</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        </IonList>
                    </IonContent>
                </IonMenu>
            </div>
            <IonRouterOutlet id="main">
                <Route path="/landing" component={Landing} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} exact={true} />
                <Route path="/register" component={RegisterLanding} exact={true} />
                <Route path="/emailRegister" component={RegisterForm} exact={true} />
                <Route path="/" render={() => <Redirect to="/landing" />} exact={true} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
