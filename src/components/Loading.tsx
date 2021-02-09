import { IonLoading } from '@ionic/react';
import React from 'react';

export const loadingComponent = (
    <IonLoading cssClass="my-custom-class" isOpen={true} message={'Please wait...'} duration={5000} />
);
