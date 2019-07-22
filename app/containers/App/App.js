/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';
import SignIn from 'containers/Auth/SignIn';
import SignUp from 'containers/Auth/SignUp';
import { NotificationContainer } from 'react-notifications';
import PostForm from '../Post/PostForm';
import SignOutProtectRoute from './SignOutProtectRoute';
import SignInProtectRoute from './SignInProtectRoute';
import PostDetail from '../../components/PostDetail';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="Share post"
      defaultTitle="Share post"
    >
      <meta name="description" content="Simple Blog sharing protal" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/feed/" />)} />
      <Route exact path="/article-frontend/" render={() => (<Redirect to="/feed/" />)} />
      <Route path="/feed/" component={HomePage} />
      <Route path="/post/detail/:slug" component={PostDetail} />
      <SignOutProtectRoute path="/auth/sign-in" component={SignIn} />
      <SignOutProtectRoute path="/auth/sign-up" component={SignUp} />
      <SignInProtectRoute path="/post/create" component={PostForm} />
      <SignInProtectRoute path="/post/:id" component={PostForm} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
    <NotificationContainer />
  </div>
);

export default App;
