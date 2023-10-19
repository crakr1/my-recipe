import {
    IonPage, 
    IonContent, 
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCardSubtitle,
    IonCard,
    IonAvatar,
    IonList,
    IonListHeader,
    IonText,
    IonItem,
    IonItemDivider,
    IonLoading,
} from "@ionic/react"
import Header from "../components/header/Header"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import avatar from './assets/images/avatar.png'
import './styles/getPost.css'
import { chatboxEllipsesOutline } from "ionicons/icons";
import axios from "../config/axios";
import { GET_ALL_POSTS } from "../config/urls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment"
import 'moment/locale/ar'
import {Pagination , Navigation, Autoplay} from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Like from "../components/Like/Like";
import GetComment from "../components/Comment/GetComment";
import CreateComment from "../components/Comment/CreateComment";
import {Editor, EditorState, convertFromRaw} from 'draft-js'


moment.locale('ar')

const GetPost = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [post, setPost] = useState()
    const [likeCount, setLikeCount] = useState()
    const [ newComment, setNewComment] = useState()
    const [steps, setSteps] = useState()

    const postId = window.location.pathname.split('/')[3]

    const {jwt} = useContext(AuthContext)
    
    useEffect(() => {
        getPost()
    },[])

    const getPost = async () => {
        try{
            await axios.get(GET_ALL_POSTS + '/' + postId, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res);
                setPost(res.data)
                const contentState = convertFromRaw(JSON.parse(res.data.steps))                
                const editorState = EditorState.createWithContent(contentState)
                setSteps(editorState)
                setShowLoading(false)
            })
        } catch(e) {
            setShowLoading(false)
        }
    }

    const swipar_settings = {
        navigation: true,
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 3000,
        }
    }
    
    function getContent()  {
        return document.getElementById('content')
    }

    function scrollToBottom() {
        getContent().scrollToBottom(500)
    }

    return (
        <IonPage>
            {showLoading 
            ? 
            <IonLoading isOpen={showLoading}/>
            :
            <>
            <Header headerTitle={post.title} defaultHref='/my-recipe/all-posts'/>
            <IonContent scrollEvents={true} id="content">
                <Swiper {...swipar_settings} modules={[Pagination, Navigation, Autoplay]} style={{direction: "ltr"}}>
                    {post.Post_Images.map(img => {
                            return (
                            <SwiperSlide key={img.id}>
                                <IonImg className="post-img" src={img.image_url}/>
                            </SwiperSlide>
                            )
                        })}
                </Swiper>
                <IonGrid>
                    <IonRow>
                        <Like sendToParent={setLikeCount}/>
                        <IonCol size="3" >
                            <IonIcon 
                            icon={chatboxEllipsesOutline} 
                            color="primary" 
                            className="post-icon"
                            onClick={() => {scrollToBottom()}}
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonCard className="ion-no-margin ion-margin-bottom" >
                    <IonGrid>
                        <IonRow className="ion-margin-top">
                        <IonAvatar className="post-avatar">
                            {post.User.img_uri 
                            ?
                            <IonImg src={post.User.img_uri }/>
                            :
                            <IonImg src={avatar}/>
                            }
                        </IonAvatar>
                        <IonCol>
                            <IonCardSubtitle className="post-username">
                                {post.User.name}
                            </IonCardSubtitle>
                            <IonCardSubtitle className="post-time" color='warning'>
                                {moment(post.createdAt).fromNow()}
                            </IonCardSubtitle>
                            </IonCol>
                            <IonCol className="ion-text-center">
                                <IonCardSubtitle>
                                    {post.country}
                                </IonCardSubtitle>
                                <IonCardSubtitle>
                                    {post.region}
                                </IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonList>
                        <IonListHeader>
                            <IonText color='primary'>
                                <h3>المكونات</h3>
                            </IonText>
                        </IonListHeader>
                        <IonItem lines="none">
                           <IonText>
                                <p>{post.contents}</p>
                           </IonText>
                        </IonItem>
                    </IonList>
                    <IonList>
                        <IonListHeader>
                            <IonText color='primary'>
                                <h3>خطوات التحضير</h3>
                            </IonText>
                        </IonListHeader>
                        <IonItem lines="none">
                            <IonText>
                                <Editor editorState={steps} readOnly={true}/>
                            </IonText>
                        </IonItem>
                    </IonList>
                </IonCard>
                <IonItemDivider color='light'>
                    <IonText color='primary'>
                        <h3 className="ion-no-margin">التعليقات</h3>
                    </IonText>
                </IonItemDivider>
                <GetComment comment={newComment}/>

                <CreateComment sendToParent={setNewComment}/>
            </IonContent>
            </>
            }
        </IonPage>
    )
}

export default GetPost