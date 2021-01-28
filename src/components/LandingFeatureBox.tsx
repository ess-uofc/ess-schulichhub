import React from 'react';
import { IonItemDivider, IonText, IonItem, IonList } from '@ionic/react';
import '../pages/Landing.scss';

const LandingFeatureBox: React.FC = () => {
    return (
        <>
            <IonItem className="FeatureBoxLeft" lines="none">
                <IonItemDivider className="ImagePlaceHolder"></IonItemDivider>
            </IonItem>
            <IonItem className="FeatureBoxRight" lines="none">
                <IonList className="ListBackLeft" color="secondary" lines="none">
                    <IonItem className="ItemBackground">
                        <IonText className="FeatureTitle">Get Special ESS Perks!</IonText>
                    </IonItem>
                    <IonItem className="ItemBackground">
                        <IonText className="FeatureDesc">
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,sed quia
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porroquisquam
                            est, qui dolorem.
                        </IonText>
                    </IonItem>
                </IonList>
            </IonItem>
            <IonItem className="FeatureBoxLeft" lines="none">
                <IonList className="ListBackRight" lines="none">
                    <IonItem className="ItemBackground">
                        <IonText className="FeatureTitle">Get Special ESS Perks!</IonText>
                    </IonItem>
                    <IonItem className="ItemBackground">
                        <IonText>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,sed quia
                            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam
                            est, qui dolorem.
                        </IonText>
                    </IonItem>
                </IonList>
            </IonItem>
            <IonItem className="FeatureBoxRight" lines="none">
                <IonItemDivider className="ImagePlaceHolder"></IonItemDivider>
            </IonItem>
        </>
    );
};

export default LandingFeatureBox;
