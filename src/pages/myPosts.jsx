import {IonPage, IonHeader, IonContent, IonToolbar,IonTitle, IonButton, IonMenuButton} from "@ionic/react"
import Header from "../components/header/Header"

const MyPosts = () => {
    return (
        <IonPage>
            <Header headerTitle='منشوراتي' defaultHref='all-posts'/>
            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default MyPosts