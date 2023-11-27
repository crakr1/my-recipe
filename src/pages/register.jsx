import {IonPage, IonHeader, IonContent, IonToolbar,IonTitle, IonAvatar, IonImg, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonText, IonLoading, IonAlert} from "@ionic/react"
import Header from "../components/header/Header"
import avatar from "./assets/images/avatar.png"
import './styles/register.css'
import { Formik } from "formik"
import * as yup from 'yup'
import axios from '../config/axios'
import {REGISTER_URL} from '../config/urls'
import {useState} from "react"
import { useHistory } from "react-router"

const Register = () => {

    const [showLoading, setShowLoading] = useState(false)
     const [showAlert, setShowAlert] = useState(false)
     const [showErrorAlert,setShowErrorAlert] = useState(false)
     const history = useHistory()

    const validationSchema = yup.object({
        name: yup
        .string()
        .nullable()
        .required("يجب عليك ادخال اسم مستخدم"),
        email: yup
        .string()
        .nonNullable()
        .email("عليك ادخال بريد الكتروني صحيح")
        .required("عليك ادخال بريد الكتروني"),
        password: yup
        .string()
        .nonNullable()
        .min(5, 'يجب عليك ادخال 5 حروف على الاقل')
        .required("عليك ادخال كلمة مرور")
    })


    const onSubmit = async (values) => {
        setShowLoading(true)
        try {
            await axios.post(REGISTER_URL, values).then(res => {
                console.log(res)
                setShowAlert(true)
                setShowLoading(false)
            })
        } catch(e) {
          if(e.response.status === 404){
            setShowLoading(false)
            setShowErrorAlert(true)
          }else {
            console.log(e.message)
            setShowLoading(false)
          }
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
            header= " تنبيه "
            subHeader= "تم تسجيل الدخول"
            message= "يمكنك الانتقال الى صفحة تسجيل الدخول"
            buttons= {[
              {
                text: "موافق",
                handler: () =>{
                  history.push('/account/login')
                }
              }
            ]}
            />
            <IonAlert
            isOpen={showErrorAlert}
            header="تنبية"
            subHeader= "البريد المستخدم موجود بالفعل هل تريد تسجيل الدخول؟"
            buttons={[
              {
                text:"موافق",
                handler:() =>{
                  history.push('/account/login')
                }
              },
              {
                text:'الغاء',
                role: "cancel"
              }
            ]}
            />
            <Header headerTitle="تسجيل مستخدم جديد" />
            <IonContent>
                <IonAvatar class="avatar">
                    <IonImg src={avatar} /> 
                </IonAvatar>
                <Formik
          initialValues={{
            name: null,
            email: null,
            password: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            onSubmit(values)
            resetForm({values: ""})
          }}
        >
          {formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
              <IonItem>
                <IonLabel position='floating'>الاسم</IonLabel>
                <IonInput
                  name='name'
                  value={formikProps.values.name}
                  onIonChange={formikProps.handleChange}
                />
              </IonItem>
              <IonText className='error'>
                {formikProps.touched.name && formikProps.errors.name}
              </IonText>
              <IonItem>
                <IonLabel position='floating'>البريد الالكتروني</IonLabel>
                <IonInput
                  name='email'
                  value={formikProps.values.email}
                  onIonChange={formikProps.handleChange}
                />
              </IonItem>
              <IonText className='error'>
                {formikProps.touched.email && formikProps.errors.email}
              </IonText>
              <IonItem>
                <IonLabel position='floating'> كلمة المرور</IonLabel>
                <IonInput
                  name='password'
                  type= 'password'
                  value={formikProps.values.password}
                  onIonChange={formikProps.handleChange}
                />
              </IonItem>
              <IonText className='error'>
                {formikProps.touched.password && formikProps.errors.password}
              </IonText>

              <div className='ion-text-center btn'>
                <IonButton type='submit'>انشاء حساب</IonButton>
                <IonRouterLink routerLink='/account/login' className='router-link'>
                  تسجبل الدخول
                </IonRouterLink>
              </div>
            </form>
          )}
        </Formik>
            </IonContent>
                </>
            }
          
        </IonPage>
    )
}

export default Register