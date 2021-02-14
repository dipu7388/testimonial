/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Footer } from './pages/footer';
import { Header } from './pages/header';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Testimonial | Dheerendra Kumar Singh"
        defaultTitle="Testimonial | Dheerendra Kumar Singh"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Testimonial application" />
      </Helmet>
      <Header></Header>
      <div className="content" id="mainContent">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer></Footer>

      <GlobalStyle />
    </BrowserRouter>
  );
}
