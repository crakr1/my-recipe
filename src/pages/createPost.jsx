import {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonText,
    IonIcon,
    IonButton,
    IonImg,
    IonToast,
    IonAlert,
} from "@ionic/react"
import Header from "../components/header/Header"
import axios from "../config/axios"
import { images } from "ionicons/icons"
import './styles/createPost.css'
import TextEditor from "../components/TextEditor/TextEditor"
import { useEffect, useState, useContext } from "react"
import { usePhotoGallery } from "../hooks/usePhotoGallery"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import {Pagination , Navigation, Autoplay} from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { CREATE_POST } from "../config/urls"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router"
import { EditorState} from 'draft-js'



const CreatePost = () => {

    const [steps, setSteps] = useState()
    const [photos, setPhotos] = useState([])
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()
    const [showImageToast, setShowImageToast] = useState(false)
    const [showContentToast, setShowContentToast] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const {takePhoto, blobUrl} = usePhotoGallery()

    const history = useHistory()

    const {jwt} = useContext(AuthContext)

    useEffect(() => {
        if(blobUrl) {
            const imgUrls = [blobUrl, ...photos]
            setPhotos(imgUrls)
        }
    },[blobUrl])

    const swipar_settings = {
        navigation: true,
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 3000,
        }
    }

    const onSubmit = async () => {
        const postData = new FormData()
        try {
          postData.append("title", title)
          postData.append("contents", contents)
          postData.append("steps", steps)
          for (let i = 0; i < photos.length; i++) {
            const response = await fetch(photos[i]);
            const blob = await response.blob();
            postData.append("postImg", blob)
          }
      
          await axios.post(CREATE_POST, postData, {
            headers: {
              Authorization: jwt
            }
          }).then(res => {
            console.log(res)
            setPhotos([])
            setTitle("")
            setContents("")
            setSteps("")
          })
        } catch (e) {
          console.log(e)
        }
      }

    const Validator = () => {
        if(photos.length > 0) {
            if( steps && title && contents ) {
                onSubmit()
                window.location.href = '/my-recipe/all-posts';
            } else {
                setShowContentToast(true)
            }
        } else {
            setShowImageToast(true)
        }
    }

    return (
        <IonPage>
            
            <Header headerTitle='انشاء منشور' defaultHref='all-posts'/>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="floating" color='warning' >العنوان</IonLabel>
                        <IonInput
                        value={title}
                        onIonChange={(e) => {setTitle(e.target.value)}}
                        />
                    </IonItem>
                    <IonItem className="ion-margin-bottom">
                        <IonLabel position="floating" color='warning' >المكونات</IonLabel>
                        <IonTextarea
                        value={contents}
                        onIonChange={(e) => {setContents(e.target.value)}}
                        />
                    </IonItem>
                    <IonLabel className="ion-margin">خطوات التحضير</IonLabel>
                    <IonItem className="ion-margin">
                        <TextEditor sendToParent={setSteps} editorState={EditorState.createEmpty()}/>
                    </IonItem>
                    <IonItem lines="none">
                        <IonText className="get-photo" onClick={takePhoto}>اضعط هنا لاضافة الصور</IonText>
                    </IonItem>
                    <IonItem className="ion-margin-bottom" lines="none">
                        {photos.length > 0 ? 
                        <Swiper {...swipar_settings} modules={[Pagination, Navigation, Autoplay]}>
                            {photos.map((img, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <IonImg src={img} />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>  
                        :
                        <div className="icon-container">
                        <IonIcon 
                        icon={images} 
                        color="primary" 
                        className="icon-images" 
                        onClick={takePhoto}
                        />
                        </div>
                        }
                    </IonItem>
                    <div>
                        <IonButton expand="block" className="ion-margin" onClick={Validator}>
                            نشر
                        </IonButton>
                    </div>
                </IonList>
                <IonToast
                isOpen={showImageToast}
                onDidDismiss={()=> setShowImageToast(false)}
                message= "يجب عليك ادخال صورة واحدة على الاقل"
                duration={1500}
                color="danger"
                />
                <IonToast
                isOpen={showContentToast}
                onDidDismiss={()=> setShowContentToast(false)}
                message= "يجب عليك ادخال جميع الحقول"
                duration={1500}
                color="danger"
                />
            </IonContent>
        </IonPage>
    )
}

export default CreatePost