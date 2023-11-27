import {
    IonPage, 
    IonContent,
    IonIcon, 
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonRouterLink, 
    IonLoading, 
    IonAlert,
} from "@ionic/react"
import Header from "../components/header/Header"
import {logIn} from "ionicons/icons"
import './styles/login.css'
import { useContext, useState } from "react"
import axios from "../config/axios"
import { LOGIN_URL } from "../config/urls"
import { Preferences } from '@capacitor/preferences';
import { useHistory } from "react-router"
import { AuthContext } from "../context/AuthContext"



const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showLoading, setShowLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const {setLoggedIn, setJwt} = useContext(AuthContext)

    const history = useHistory()

    const onSubmit = async () =>{
        setShowLoading(true)
        const loginForm ={
            email,
            password
        }
        try{
            await axios.post(LOGIN_URL, loginForm).then(res => {
                Preferences.set({
                    key: 'accessToken',
                    value: res.data.accessToken,
                });
                setLoggedIn(true)
                setJwt(res.data.accessToken)
                history.push('/my-recipe/all-posts')
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e)
            if (e.response.status === 404 ){
                setShowAlert(true)
                setShowLoading(false)
            }else {
                console.log(e)
                setShowLoading(false)
            }
        }
    }

    return (
        <IonPage>
            {showLoading 
            ? 
            <IonLoading isOpen={showLoading} />
            :
            <>
            <IonAlert 
            isOpen={showAlert}
            header= "تنبية"
            message= "كلمة المرور او البريد الاكتروني غير صحيح"
            buttons= {[
                {
                    text: "موافق",
                    role: "ok"
                }
            ]}
            />
            <Header defaultHref='register'  headerTitle="صفحة تسجيل الدخول"/>
            <IonContent>
                <IonIcon className='icon' icon={logIn} />
                <IonList>
                    <IonItem className="ion-margin-bottom">
                        <IonLabel position="floating" >البريد الاكتروني</IonLabel>
                        <IonInput value={email} onIonChange={(e) => {setEmail(e.target.value)}} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating" > كلمة المرور</IonLabel>
                        <IonInput type="password" value={password} onIonChange={(e) => {setPassword(e.target.value)}}/>
                    </IonItem>
                </IonList>
                <div className="ion-text-center btn">
                    <IonButton onClick={()=>{onSubmit()}}>تسجيل الدخول</IonButton>
                    <IonRouterLink routerLink="/account/register" className="router-link">تسجيل مستخدم</IonRouterLink>
                </div>
            </IonContent>    
            </>
            }   
            
        </IonPage>
    )
}

export default Login