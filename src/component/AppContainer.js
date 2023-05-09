import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import AboutUsPage from './AboutUsPage';
import AdminCategory from './AdminCategory';
import AdminContact from './AdminContact';
import AdminFaq from './AdminFaq';
import AdminFeedback from './AdminFeedback';
import AdminHome from './AdminHome';
import AdminInvoiceManagement from './AdminInvoiceManagement';
import AdminNews from './AdminNews';
import AdminPage from './AdminPage';
import AdminProduct from './AdminProduct';
import AdminUser from './AdminUser';
import ClientAccountManagement from './ClientAccountManagement';
import ClientInvoiceManagement from './ClientInvoiceManagement';
import FaqPage from './FaqPage';
import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';
import NewsDetail from './NewsDetail';
import NewsHome from './NewsHome';
import NewsPage from './NewsPage';
import PageNotFound from './PageNotFound';
import ProductCart from './ProductCart';
import ProductDetail from './ProductDetail';
import ProductHome from './ProductHome';
import ProductPage from './ProductPage';
import ScrollToTop from './Scroll.js';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UnauthorizedPage from './UnauthorizedPage';
import UserSignUpSuccess from './UserSignUpSuccess';
import UserUpdateSuccess from './UserUpdateSuccess';

import styles from '../css/AppContainer.module.css';

const AppContainer = () => {
  return (
    <div className={styles.appMargin}>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="aboutus" element={<AboutUsPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="news" element={<NewsPage />}>
                <Route index element={<NewsHome />} />
                <Route path=":newsId" element={<NewsDetail />} />
              </Route>

              <Route path="admin" element={<AdminPage />}>
                <Route index element={<AdminHome />} />
                <Route path="product" element={<AdminProduct />} />
                <Route path="invoice" element={<AdminInvoiceManagement />} />
                <Route path="user" element={<AdminUser />} />
                <Route path="faq" element={<AdminFaq />} />
                <Route path="feedback" element={<AdminFeedback />} />
                <Route path="contact" element={<AdminContact />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="category" element={<AdminCategory />} />
              </Route>

              <Route path="product" element={<ProductPage />}>
                <Route index element={<ProductHome />} />
                <Route path=":productId" element={<ProductDetail />} />
              </Route>

              <Route path="cart" element={<ProductCart />} />
              <Route path="clientinvoicemanagement" element={<ClientInvoiceManagement />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="account" element={<ClientAccountManagement />} />
              <Route path="user/createusersuccess" element={<UserSignUpSuccess />} />
              <Route path="account/user/updateusersuccess" element={<UserUpdateSuccess />} />
              <Route path="unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Layout>
        </Layout>
      </HashRouter>
    </div>
  );
};

export default AppContainer;
