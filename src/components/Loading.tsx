import { IonLoading } from '@ionic/react';
import React from 'react';

export const loadingComponent = (
    <IonLoading spinner="crescent" cssClass="loading" isOpen={true} message={'Please wait...'} duration={5000} />
);
