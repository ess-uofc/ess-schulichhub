import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonRouterLink,
} from "@ionic/react";
import "./login.css";



const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="loginToolbar">
            <IonTitle className="loginTitle">
              Welcome to the Schulich Hub!
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="loginContent">
          <div>
            <IonInput
                placeholder="Username"
                className="username loginInputs"
                onIonChange={(e: any) => setUsername(e.target.value)}
            />
            <IonInput
                type="password"
                placeholder="Password"
                className="password loginInputs"
                onIonChange={(e: any) => setPassword(e.target.value)}
            />
            <IonButton className="loginButton" onClick={loginClicked}>
              Sign In
            </IonButton>
            <p>
              New here? <IonRouterLink>Join the Hub</IonRouterLink>
            </p>
            <IonRouterLink>Forgot Password?</IonRouterLink>
          </div>
        </IonContent>
      </IonPage>
  );
};

export default Login;
