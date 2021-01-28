import React from 'react';
import './LandingInfo.scss';
import { IonButton } from '@ionic/react';

const LandingInfo: React.FC = () => {
    return (
        <div>
            <h1 className="ion-margin">Connect with clubs and find opportunitites to get involved</h1>
            <div className="ion-margin landingParagraphs">
                <h3>Project Hub</h3>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                </p>
                <IonButton className="learnMore">Learn More</IonButton>
            </div>
            <div className="ion-margin landingParagraphs">
                <h3>Volunteer Hub</h3>
                <p>
                    Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                </p>
                <IonButton className="learnMore">Learn More</IonButton>
            </div>
            <div className="ion-margin landingParagraphs">
                <h3>Startup Hub</h3>
                <p>
                    Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
                </p>
                <IonButton className="learnMore">Learn More</IonButton>
            </div>
            <div className="ion-margin landingParagraphs">
                <h3>Club Listings</h3>
                <p>
                    Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                    sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                </p>
                <IonButton className="learnMore">Learn More</IonButton>
            </div>
            <h2>You&apos;re in good company</h2>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
            <div className="placeholderBlock">Placeholder</div>
        </div>
    );
};

export default LandingInfo;
