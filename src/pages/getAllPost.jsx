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
    IonRefresher,
    IonRefresherContent,
} from "@ionic/react"
import Header from "../components/header/Header"
import noImage from './assets/images/no_image.png'
import avatar from './assets/images/avatar.png'
import './styles/getAllPosts.css'
import axios from "../config/axios"
import { GET_ALL_POSTS } from "../config/urls"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import moment from "moment"
import 'moment/locale/ar'


moment.locale('ar')

const GetAllPost = () => {


    const [showLoading, setShowLoading] = useState(true)
    const [posts, setPosts] = useState()

    const {jwt} = useContext(AuthContext)

    useEffect(() => {
        getPosts()
    },[])

    const getPosts = async () => {
        try{
            await axios.get(GET_ALL_POSTS, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res);
                setPosts(res.data)
                setShowLoading(false)
            })
        } catch(e) {
            console.log(r.response)
            setShowLoading(false)
        }
    }

    function doRefresh(event) {
        setTimeout(() => {
          getPosts();
          event.detail.complete();
        }, 1000);
      }

    return (
        <IonPage>
            {showLoading ? 
            <IonLoading isOpen={showLoading} /> 
            : posts &&
            <>
            <Header headerTitle='وصفاتي' disabledBackButton="true"/>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh} >
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {posts.length > 0 
                ? 
                posts.slice().reverse().map((post) => {
                    return (
                    <IonCard key={post.id} routerLink={`/my-recipe/all-posts/${post.id}`}>
                        <IonImg src={post.Post_Images[0].image_url} className="post-image" />
                        <IonCardContent className="ion-padding">
                            <IonGrid>
                                <IonRow>
                                    <IonAvatar className="post-avatar">
                                        {post.User.img_uri 
                                        ?
                                        <IonImg src={post.User.img_uri }/>
                                        :
                                        <IonImg src={avatar}/>
                                        }
                                    </IonAvatar>
                                    <IonCol>
                                        <IonText className="post-user">
                                            {post.User.name}
                                        </IonText>
                                        <IonText className="post-moment" color='warning'>
                                            {moment(post.createdAt).fromNow()}
                                        </IonText>
                                    </IonCol>
                                </IonRow>
                                <IonCardTitle className="post-title" color='primary'>{post.title}</IonCardTitle>
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

export default GetAllPost