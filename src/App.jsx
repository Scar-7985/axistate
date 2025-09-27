import { lazy } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'
import NonProtectedRoutes from "./Auth/NonProtectedRoutes";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';

const Home = lazy(() => import("./Pages/Home"));
const AddListing = lazy(() => import("./Pages/AddListing"));
const ViewProperty = lazy(() => import("./Pages/ViewProperty"));
const AccountDetails = lazy(() => import("./Pages/AccountDetails"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const AddLease = lazy(() => import("./Pages/AddLease"));
const MyListings = lazy(() => import("./Pages/MyListings"));
const Search = lazy(() => import("./Pages/Search"));
const Terms = lazy(() => import("./Pages/Terms"));
const Settings = lazy(() => import("./Pages/Settings"));

const App = () => {

  const location = useLocation();

  const showHeader = location.pathname !== "/add-lease" && location.pathname !== "/settings";
  const showFooter = location.pathname !== "/add-property" &&
    location.pathname !== "/properties" &&
    location.pathname !== "/add-listing"

  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        {
          showHeader &&
          <Header />
        }
        <ScrollToTop />
        <Routes>

          {/* <Route element={<NonProtectedRoutes />}> */}
          {/* <Route path='/' element={<Home />} /> */}
          {/* </Route> */}

          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<Search />} />
          <Route path='/view-property' element={<ViewProperty />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/terms' element={<Terms />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/account-details' element={<AccountDetails />} />
            <Route path='/add-listing' element={<AddListing />} />
            <Route path='/add-lease' element={<AddLease />} />
            <Route path='/my-listings' element={<MyListings />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

          <Route path='*' element={<Home />} />
        </Routes>
        {
          showFooter &&
          <Footer />
        }
      </div>
    </div>
  )
}

export default App;
