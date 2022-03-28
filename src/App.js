import { Route, Switch } from 'react-router-dom';
import { isAuth } from './hoc/isAuthenticated.js';
import { isGuest } from './hoc/isGuest.js';

import { AuthProvider } from './contexts/AuthContext';
import { UpdateProvider } from './contexts/UpdateContextFooter.js';
import { NotificationProvider } from './contexts/NotificationContext.js';

import ScrollToTop from './hooks/useScrollToTop.js';

import Register from './components/Register/Register.js';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Details from './components/Details/Details.js';
import Delete from './components/Delete/Delete.js';
import Edit from './components/Edit/Edit.js';
import Create from './components/Create/Create.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import Logout from './components/Logout/Logout.js';
import MyStadiums from './components/MyStadiums/MyStadiums.js';
import MyProfile from './components/MyProfile/MyProfile.js';
import NotFound from './components/NotFound/NotFound.js';
import LikedStadiums from './components/Home/Filters/LikedStadiums/LikedStadiums.js';
import CommentedStadiums from './components/Home/Filters/CommentedStadiums/CommentedStadiums.js';
import BiggestCapacity from './components/Home/Filters/BiggestCapacity/BiggestCapacity.js';
import AlphabeticalOrder from './components/Home/Filters/AlphabeticalOrder/AlphabeticalOrder.js';
import ByCountry from './components/Home/Filters/ByCountry/ByCountry.js';
import ByCountryView from './components/Home/Filters/ByCountry/ByCountryView/ByCountryView.js';
import Users from './components/Users/Users.js';
import UserDetails from './components/UserDetails/UserDetails.js';
import ErrorBoundary from './components/common/ErrorBoundary.js';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UpdateProvider>
          <NotificationProvider>
            <section>
              <Header />
              <section className="app-container">
                <ScrollToTop />
                <Switch>
                  <Route path="/home/all" exact component={Home} />
                  <Route path="/" exact component={Home} />
                  <Route path="/home/liked" exact component={LikedStadiums} />
                  <Route path="/home/commented" exact component={CommentedStadiums} />
                  <Route path="/home/capacity" exact component={BiggestCapacity} />
                  <Route path="/home/alphabetical" exact component={AlphabeticalOrder} />
                  <Route path="/home/by-country" exact component={ByCountry} />
                  <Route path="/home/by-country/:country" exact component={ByCountryView} />
                  <Route path="/my-stadiums" component={isAuth(MyStadiums)} />
                  <Route path="/my-profile" component={isAuth(MyProfile)} />
                  <Route path="/stadiums/details/:stadiumId" exact component={Details} />
                  <Route path="/stadiums/details/:stadiumId/edit" exact component={isAuth(Edit)} />
                  <Route path="/stadiums/details/:stadiumId/delete" exact component={isAuth(Delete)} />
                  <Route path="/stadiums/create" component={isAuth(Create)} />
                  <Route path="/login" component={isGuest(Login)} />
                  <Route path="/register" component={isGuest(Register)} />
                  <Route path="/logout" component={isAuth(Logout)} />
                  <Route path="/users" exact component={isAuth(Users)} />
                  <Route path="/users/:userId" exact component={isAuth(UserDetails)} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </section>
              <Footer />
            </section>
          </NotificationProvider>
        </UpdateProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
