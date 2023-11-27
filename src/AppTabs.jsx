import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { addCircle, home } from 'ionicons/icons';


import GetAllPost from './pages/getAllPost';
import GetPost from './pages/getPost';
import CreatePost from './pages/createPost';
import MyPosts from './pages/myPosts';
import Profile from './pages/profile';
import UpdatePost from './pages/updatePost';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const AppTabs = () => {

  const{loggedIn} = useContext(AuthContext)

    console.log(loggedIn)

    if(!loggedIn ){
      return(
        <Redirect to="/account/login"/>
      )
    }else {
      return(
        <IonTabs>
          <IonRouterOutlet id='content1'>
            <Route exact path="/my-recipe/account/profile">
              <Profile />
            </Route>
            <Route exact path="/my-recipe/all-posts">
              <GetAllPost />
            </Route>
            <Route exact path="/my-recipe/all-posts/:id">
              <GetPost />
            </Route>
            <Route exact path="/my-recipe/my-posts">
              <MyPosts />
            </Route>
            <Route exact path="/my-recipe/my-posts/:id">
              <UpdatePost />
            </Route>
            <Route exact path="/my-recipe/create-posts">
              <CreatePost  />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='create-post' href='/my-recipe/create-posts'>
              <IonIcon icon={addCircle}/>
              <IonLabel>نشر</IonLabel>
            </IonTabButton>
            <IonTabButton tab='all-posts' href='/my-recipe/all-posts'>
              <IonIcon icon={home}/>
              <IonLabel>المنشورات</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
    )
    }

    
}

export default AppTabs