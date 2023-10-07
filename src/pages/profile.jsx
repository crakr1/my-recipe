import {IonPage, IonContent, IonAlert, IonLoading} from "@ionic/react"
import { PROFILE_URL, PROFILE_UPDATE_URL } from "../config/urls"
import UserDetails from "../components/UserProfile/UserDetails"
import UserAvatar from "../components/UserProfile/UserAvatar"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Header from "../components/header/Header"
import axios from "../config/axios"
import './styles/profile.css'

const Profile = () => {

    const [showLoading, setShowLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [password, setPassword] = useState()
    const [userImg, setUserImg] = useState()
    const [email, setEmail]= useState()
    const [name, setName]= useState()   

    const {jwt} = useContext(AuthContext)


    useEffect(() => {
        getProfile()
    },[])



    const getProfile = async() => {
        try{
            await axios.get(PROFILE_URL, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res.data)
                setName(res.data.name)
                setEmail(res.data.email)
                setUserImg(res.data.img_uri)
                setShowLoading(false)
            })
        }catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    const onSubmit = async () => {
        setShowLoading(true)
        const updateForm = {
            name,
            password
        }
        try {
            await axios.put(PROFILE_UPDATE_URL, updateForm, {
                headers: {
                    Authorization: jwt
                }
            }). then(res =>{
                console.log(res)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    return (
        <IonPage>
            {showLoading 
            ?
            <IonLoading isOpen={showLoading}/> 
            :
            <>
            <IonAlert 
            isOpen={showAlert}
            header="تنبيه"
            message= "هل تريد تعديل البيانات الشخصية؟"
            onDidDismiss={() => {setShowAlert(false)}}
            buttons= {[
                {
                    text: "موافق",
                    handler: () => {onSubmit(),  setShowAlert(false);}
                },
                {
                    text: "الغاء",
                    role: "cancel"
                }
            ]} />
            <Header headerTitle='الصفحة الشخصية' defaultHref='all-posts'/>
            <IonContent className="ion-padding">
            <UserAvatar userImg={userImg}/>
            <UserDetails name={name} email={email} userName={setName} password={setPassword} showAlert={setShowAlert} />
            </IonContent>
            </>
            }
        </IonPage>
    )
}

export default Profile