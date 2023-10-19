import {
    IonPage, 
    IonList, 
    IonContent, 
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonLoading,
    IonAlert,
    IonToast,

} from "@ionic/react"
import Header from "../components/header/Header"
import TextEditor from "../components/TextEditor/TextEditor"
import axios from '../config/axios'
import { GET_ALL_POSTS, GET_MY_POSTS } from "../config/urls"
import { AuthContext } from "../context/AuthContext"
import { useEffect, useState, useContext } from "react"
import { EditorState, convertFromRaw} from 'draft-js'



const UpdatePost = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()
    const [editor, setEditor] = useState()
    const [ steps, setSteps] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [showTost, setShowTost] = useState(false)

    const{jwt} = useContext(AuthContext)

    const postId = window.location.pathname.split('/')[3]


    useEffect(() => {
        getPost()
    },[])

    const validator = () => {
        if(title && contents && steps) {
            return (
                setShowAlert(true)
            )
        } else {
            setShowTost(true)
        }
    } 

    const getPost = async () => {
        try {
            await axios.get(GET_MY_POSTS + '/' + postId, {
                headers: {
                    Authorization: jwt
                }

            }).then(res => {
                console.log(res);
                setTitle(res.data.title)
                setContents(res.data.contents)
                const contentState = convertFromRaw(JSON.parse(res.data.steps))
                const editorState = EditorState.createWithContent(contentState)
                setEditor(editorState)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    const onSubmit = async () =>{
        const postForm = {
            'title': title,
            'contents': contents,
            'steps':steps
        }
        try{
            await axios.put(GET_MY_POSTS + '/' + postId + '/update', postForm, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res)
                window.location.href = ( 'my-recipe/all-posts' + '/' + postId)
            })
        } catch(e) {
            console.loge(response)
        }
    }

    return (
        <IonPage>
            {showLoading ? 
            <IonLoading isOpen={showLoading}/> 
            :
            <>
            <IonAlert 
            isOpen={showAlert}
            onDidDismiss={() => {setShowAlert(false)}}
            header= {"تنبية"}
            subHeader={"تعديل تامنشور"}
            message={"انت على وشك تعديل المنشور , هل تريد تعديل المنشور ؟"}
            buttons={[
                {
                    text: "نعم",
                    handler: () => {onSubmit() }
                },
                {
                    text:"الغاء",
                    role: "cancel"

                }
            ]}
            />
           <Header headerTitle='تعديل على منشوري' />
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="floating" color="warning">العنوان</IonLabel>
                        <IonInput value={title} onIonChange={(e) => { setTitle(e.target.value)}} />
                    </IonItem>
                    <IonItem className="ion-margin-bottom">
                        <IonLabel position="floating" color="warning">المكونات</IonLabel>
                        <IonTextarea value={contents} onIonChange={(e) => { setContents(e.target.value)}}/>
                    </IonItem>
                    <IonLabel className="ion-margin">خطوات التحضير</IonLabel>
                    <IonItem lines="none" className="ion-margin-top">
                        <TextEditor editorState={editor} sendToParent={setSteps}/>
                    </IonItem>
                    <div className="btn">
                        <IonButton expand="block" onClick={validator}>تعديل المنشور</IonButton>
                    </div>
                </IonList>
                <IonToast
                isOpen={showTost}
                onDidDismiss={() => {setShowTost(false)}}
                message={"يجب عليك ادخال جميع الحقول"}
                duration={1500}
                color="danger"
                />
            </IonContent>
            </>
            }
        </IonPage>
    )
}

export default UpdatePost