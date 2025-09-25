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
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails"));
const AccountDetails = lazy(() => import("./Pages/AccountDetails"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const AddLease = lazy(() => import("./Pages/AddLease"));
const MyListings = lazy(() => import("./Pages/MyListings"));
const Search = lazy(() => import("./Pages/Search"));
const Terms = lazy(() => import("./Pages/Terms"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));

const App = () => {

  const location = useLocation();

  const showHeader = location.pathname !== "/add-lease" && location.pathname !== "/dashboard";
  const showFooter = location.pathname !== "/add-property" &&
    location.pathname !== "/properties" &&
    location.pathname !== "/add-sale" &&
    location.pathname !== "/add-lease";
    location.pathname !== "/add-lease";

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
          <Route path='/property-details' element={<PropertyDetails />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/terms' element={<Terms />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/account-details' element={<AccountDetails />} />
            <Route path='/add-listing' element={<AddListing />} />
            <Route path='/add-lease' element={<AddLease />} />
            <Route path='/my-listings' element={<MyListings />} />
            <Route path='/dashboard' element={<Dashboard />} />
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
