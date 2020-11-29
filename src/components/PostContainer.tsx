import React from 'react';
import './PostContainer.css';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonButton,
} from '@ionic/react';
import { ellipsisVerticalOutline } from 'ionicons/icons';

interface ContainerProps {
    StudentName: string;
}

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    return (
        <IonCard>
            <IonCardHeader>
                <div className="postInfo">
                    <div className="image">
                        <div className="imageDiv"></div>
                    </div>
                    <div className="text">
                        <IonCardTitle>{props.StudentName}</IonCardTitle>
                        <IonCardSubtitle>University of Calgary - 1 Day ago</IonCardSubtitle>
                    </div>
                    <div className="actions">
                        <IonButton className="moreButton" href="/home">
                            <IonIcon icon={ellipsisVerticalOutline} />
                        </IonButton>
                    </div>
                </div>
            </IonCardHeader>
            <IonCardContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris purus. Nunc ut lorem nec est
                accumsan luctus. Proin rhoncus, dolor sit amet vehicula elementum, turpis nulla sagittis velit, at
                auctor est urna vehicula libero. Phasellus facilisis neque non euismod rhoncus. Phasellus ipsum erat,
                varius id tellus a, blandit posuere elit. Donec sagittis mauris tristique urna egestas, eget placerat
                ligula sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Sed ut eleifend dolor. Donec non dolor laoreet, malesuada eros ut, aliquam nunc. Cras eget malesuada
                odio, eu vulputate erat. Aenean a tempus arcu, sit amet fermentum erat. Sed suscipit dui in mattis
                aliquet. Pellentesque condimentum, orci non sollicitudin rhoncus, ante lorem blandit mauris, et pretium
                augue augue et libero. Donec sagittis sapien erat, at egestas felis consequat at. Morbi pulvinar ipsum
                diam, id placerat arcu blandit eu. Mauris euismod ex non nibh mattis, in faucibus quam scelerisque.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </IonCardContent>
        </IonCard>
    );
};

export default PostContainer;
