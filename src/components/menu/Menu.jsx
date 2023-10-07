import { 
    IonContent,
    IonHeader,
    IonImg,
    IonText,
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonMenu, 
    IonAvatar, 
    IonTitle, 
    IonToolbar,
    IonLoading
} from "@ionic/react"
import { clipboardOutline, logOutOutline, personCircleOutline } from "ionicons/icons"
import avatar from '../../pages/assets/images/avatar.png'
import axios from '../../config/axios'
import {PROFILE_URL} from '../../config/urls'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Preferences } from '@capacitor/preferences';
import { useHistory } from "react-router"



const Menu =() => {

    const [showLoading, setShowLoading] = useState(true)
    const [name, setName]= useState()   
    const [img, setImg]= useState()   

    const {jwt, setLoggedIn} = useContext(AuthContext)

    const history = useHistory()

    useEffect(() => {
        getProfile()
    }, [])

    const logOut = async () => {
        await Preferences.remove({key: 'accessToken'})
        setLoggedIn(false)
        history.push('/account/login')
    }

    const getProfile = async () => {
        setShowLoading(true)
        try{
            await axios.get(PROFILE_URL, {
                headers: {
                    authorization: jwt
                }
            }).then(res => {
                console.log(res);
                setName(res.data.name)
                setImg(res.data.img_uri)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    return (
    <IonMenu side="end" contentId="menu">
        {showLoading 
        ?
        <IonLoading isOpen={showLoading}/>
        :
        <>
            <IonHeader>
            <IonToolbar>
                <IonTitle>hi evrey one</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonAvatar className='avatar'>
                {img ? 
                    <IonImg src={img}/>
                    :
                    <IonImg src={avatar} />
                }
            </IonAvatar>
            <div className="ion-text-center ion-margin-top">
                <IonText>
                    <h3>{name}</h3>
                </IonText>
            </div>
            <IonList>
                <IonItem routerLink="/my-recipe/account/profile">
                    <IonIcon color="primary" icon={personCircleOutline}/>
                    <IonLabel className="ion-margin">الصفحة الشخصية</IonLabel>
                </IonItem>
                <IonItem routerLink="/my-recipe/my-posts">
                <IonIcon color="primary" icon={clipboardOutline}/>
                    <IonLabel className="ion-margin"> منشوراتي</IonLabel>
                </IonItem>
                <IonItem onClick={() => {logOut()}}>
                <IonIcon color="primary" icon={logOutOutline}/>
                    <IonLabel className="ion-margin">تسجيل الخروج </IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
        </>
        }
    </IonMenu>
    )
}

export default Menu