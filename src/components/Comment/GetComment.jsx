import { 
    IonAvatar,
    IonCard, 
    IonCardSubtitle, 
    IonGrid, 
    IonImg, 
    IonRow, 
    IonText, 
} from "@ionic/react"
import avatar from '../../pages/assets/images/avatar.png'
import axios from '../../config/axios'
import { GET_ALL_POSTS } from "../../config/urls"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


const GetComment = (props) => {

    const {jwt} = useContext(AuthContext)

    const [comments, setComments] = useState()
    const [name, setName]= useState()
    
    const postId = window.location.pathname.split('/')[3]

    useEffect(() => {
        getComments()
    },[props.comment])

    const getComments = async () => {
        try{
            await axios.get(GET_ALL_POSTS + '/' + postId + '/get-comments', {
                headers : {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res)
                setComments(res.data)
                setName(res.data.name)
            })
        } catch(e) {
            console.log(e.response)
        }
    }
    return (
        <IonGrid className="ion-no-margin">
            {comments && 
            comments.map(comment => {
                return(
            <IonRow key={comment.id}   >
                <IonAvatar className="comment-avatar">
                    {comment.User.img_uri 
                    ?
                    <IonImg src={comment.User.img_uri }/>
                    :
                    <IonImg src={avatar}/>
                    }
                </IonAvatar>
                <IonCard className='comment-card ion-padding'  >
                    <IonCardSubtitle color='warning ion-margin-bottom'>{comment.User.name}</IonCardSubtitle>
                    <IonText className='comment-text'>
                        {comment.text}
                    </IonText>
                </IonCard>
            </IonRow>
                )
            })
            }
        </IonGrid>
    )
}

export default GetComment