import {
    IonPage,
    IonContent, 
    IonCard, 
    IonImg,
    IonCardContent,
    IonGrid, 
    IonRow,
    IonAvatar,
    IonCol,
    IonText,
    IonCardTitle,
    IonCardSubtitle,
    IonLoading,
    IonButtons,
    IonIcon,
    useIonActionSheet,
    IonAlert,
} from "@ionic/react"
import Header from "../components/header/Header"
import './styles/getAllPosts.css'
import axios from "../config/axios"
import { GET_MY_POSTS, DELETE_POST } from "../config/urls"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {ellipsisVertical} from "ionicons/icons"
import './styles/getMyPosts.css'
import { useHistory } from "react-router"


const MyPosts = () => {


    const [showLoading, setShowLoading] = useState(true)
    const [posts, setPosts] = useState()
    const [postId, setPostId] = useState()
    const [showAlert, setShowAlert] = useState(false)

    const [present, dismiss] = useIonActionSheet()

    const history = useHistory()

    const {jwt} = useContext(AuthContext)

    useEffect(() => {
        getPost()
    },[])

    const getPost = async () => {
        try {
            await  axios.get(GET_MY_POSTS, {
                headers: {
                    Authorization : jwt
                }
            }).then(res => {
                console.log(res);
                setPosts(res.data)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    const deletePost = async () => {
        try{
           await axios.delete(DELETE_POST, {
            data: {
                'PostId' : postId
            },
            headers: {
                Authorization: jwt
            }
           }).then(res => {
            console.log(res)
            setShowLoading(false)
            getPost()
           })
        } catch(e) {
            console.log(e.response)
            setShowLoading(false)
        }
    }

    

    return (
        <IonPage>
            {showLoading ? 
            <IonLoading isOpen={showLoading} /> 
            : posts &&
            <>
            <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"تنبية"}
            message={'هل تريد حذف المنشور؟'}
            buttons={[
                {
                    text:"نعم",
                    handler: () => {
                        deletePost()
                    }
                },
                {
                    text: "الغاء",
                    role: "cancel"
                }
            ]}
            />
            <Header headerTitle='منشوراتي' defaultHref='my-recipe/all-posts' />
            <IonContent>
                {posts.length > 0 
                ? 
                posts.slice().reverse().map((post) => {
                    return (
                    <IonCard key={post.id} >
                        <IonImg src={post.Post_Images[0].image_url} className="post-image" />
                        <IonCardContent className="ion-padding">
                            <IonGrid>
                                <IonRow className="ion-justify-content-between">
                                <IonCardTitle className="post-title" color='primary'>{post.title}</IonCardTitle>
                                <IonButtons
                                    onClick={() => {
                                        present([
                                            {
                                                text: "تعديل المنشور",
                                                handler: () => {
                                                    history.push(`/my-recipe/my-posts/${post.id}`)
                                                }
                                            },
                                            {
                                                text: "الانتقال للمنشور",
                                                handler: () => {
                                                    history.push(`/my-recipe/all-posts/${post.id}`)
                                                }
                                            },
                                            {
                                                text: "حذف المنشور",
                                                handler: () => {
                                                    setPostId(post.id)
                                                    setShowAlert(true)
                                                }
                                            },
                                            {
                                                text: "الغاء",
                                                role: "cancel"
                                            },
                                        ],'تفاصيل المنشور' )
                                    }}
                                >
                                    <IonIcon icon={ellipsisVertical} className="post-icon"/>
                                </IonButtons>
                                </IonRow>
                                <IonCardSubtitle className="post-contents">{post.contents}</IonCardSubtitle>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                    )
                })
                
                :
                <IonCard className="ion-padding ion-text-center">
                    <IonCardTitle color='primary' >لا يوجد منشورات لعرضها</IonCardTitle>
                </IonCard>
                }   
            </IonContent>
            </>
            }
        </IonPage>
    )
}

export default MyPosts