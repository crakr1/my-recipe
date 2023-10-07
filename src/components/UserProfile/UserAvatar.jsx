import { IonAvatar, IonImg, IonIcon} from "@ionic/react"
import { usePhotoGallery } from "../../hooks/usePhotoGallery"
import avatar from '../../pages/assets/images/avatar.png'
import { UPLOAD_USER_PHOTO } from "../../config/urls"
import { useContext, useEffect, useState, useRef } from "react"
import { addOutline } from "ionicons/icons"
import axios from '../../config/axios'
import { AuthContext } from "../../context/AuthContext"

const UserAvatar = (props) => {

    const [userImg, setUserImg] = useState(props.userImg)

    const {jwt} = useContext(AuthContext)

    const takePhotoRef = useRef()

    const {takePhoto, blobUrl} = usePhotoGallery()

    useEffect(() => {
        if(blobUrl){
            setUserImg(blobUrl)
            uploadPhoto()
        }
    },[blobUrl])

    const uploadPhoto = async () => {
        const photoData = new FormData()
        try{
            const response = await fetch(blobUrl)
            const blob = await response.blob()
            photoData.append('avatar', blob)
            await axios.put(UPLOAD_USER_PHOTO, photoData, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res)
            })
        }catch(e) {
            console.log(e.response)
        }
    }

    return(
        <div className="avatar-container">
            <IonAvatar className="avatar" ref={takePhotoRef} onClick={() => {takePhoto()}}>
                 {userImg? 
                    <IonImg src={userImg}/>
                    :
                    <IonImg src={avatar} />
                }
            </IonAvatar>
            <IonIcon icon={addOutline} className="user-icon" onClick={() => {takePhotoRef.current.click()}} />
        </div>
    )
}

export default UserAvatar