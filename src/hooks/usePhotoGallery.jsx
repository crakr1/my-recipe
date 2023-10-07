import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';


export function usePhotoGallery() {

    const [blobUrl, setBlobUrl] = useState()

    const takePhoto = async () => {
        try {
            const cameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Prompt,
                quality: 100, 
                promptLabelHeader: " صورة",
                promptLabelPhoto: "اختيار صورة من الملفات",
                promptLabelPicture: "التقاط صورة"

            })
            setBlobUrl(cameraPhoto.webPath)
            console.log(cameraPhoto)
        }catch(e) {
            console.log("photo is teking")
        }
      
    } 
    
    return {
        takePhoto,
        blobUrl
    }
}