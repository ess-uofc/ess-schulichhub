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
import "./Login.css";
import User from "../Models/User";

/**
 * @author Carter Zimer
 * @param email the user's email aka username
 * @param password the user's password
 */
async function handleSubmit(email: string, password: string) {
  if (await User.login(email, password) != null) {
    alert('login success')
  } else {
    alert('login failed')
  }
}

/**
 * @author Carter Zimmer & Dennis Lieu
 * @constructor sets up the state variables that get bound to the input fields and
 * are used when the login button is clicked
 */
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
            <IonButton
                className="loginButton"
                onClick={async () => await handleSubmit(username, password)}>
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
