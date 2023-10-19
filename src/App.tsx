import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import  Register from './pages/register'
import Login from './pages/login';
import AppTabs from './AppTabs';
import NotFound from './pages/notFound';
import Menu from './components/menu/Menu';
import  AuthContextProvider from './context/AuthContext';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthContextProvider>
      <IonReactRouter>
        <IonRouterOutlet >
          <Route exact path="/account/register">
              <Register />
          </Route>
          <Route exact path="/account/login">
              <Login />
          </Route>
          <Route path="/my-recipe">
            <Menu />
            <AppTabs/>
          </Route>
          <Route exact path="/">
              <Redirect to ='/my-recipe/all-posts'/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthContextProvider>
  </IonApp>
);


export default App;
