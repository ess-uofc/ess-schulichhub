import { IonRow, IonCol, IonButton, IonGrid, IonIcon } from '@ionic/react';
import React from 'react';

export const ButtonBar: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonButton size="small">Action</IonButton>
                </IonCol>
                <IonCol>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" ios="heart" md="heart-sharp"></IonIcon>
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" ios="share" md="share-sharp"></IonIcon>
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};
