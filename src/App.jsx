import { lazy } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'
import NonProtectedRoutes from "./Auth/NonProtectedRoutes";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import SearchLease from './Pages/SearchLease';

const Home = lazy(() => import("./Pages/Home"));
const PropertyDetails = lazy(() => import("./Pages/PropertyDetails"));
const AccountDetails = lazy(() => import("./Pages/AccountDetails"));
const AddSale = lazy(() => import("./Pages/AddSale"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const AddListingOption = lazy(() => import("./Pages/AddListingOption"));
const AddLease = lazy(() => import("./Pages/AddLease"));
const MyListings = lazy(() => import("./Pages/MyListings"));
const SearchProperties = lazy(() => import("./Pages/SearchProperties"));
const LeaseProperties = lazy(() => import("./Pages/SearchLease"));
const Terms = lazy(() => import("./Pages/Terms"));

const App = () => {

  const location = useLocation();

  const showHeader = location.pathname !== "/add-lease";
  const showFooter = location.pathname !== "/add-property" &&
    location.pathname !== "/properties" &&
    location.pathname !== "/add-sale" &&
    location.pathname !== "/add-lease";

  return (
    <div id="wrapper">
      <div id="page" className="clearfix">
        {
          showHeader &&
          <Header />
        }
        {/* <ScrollToTop /> */}
        <Routes>

          {/* <Route element={<NonProtectedRoutes />}> */}
          {/* <Route path='/' element={<Home />} /> */}
          {/* </Route> */}

          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<SearchProperties />} />
          <Route path='/lease' element={<SearchLease />} />
          <Route path='/property-details' element={<PropertyDetails />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/terms' element={<Terms />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/account-details' element={<AccountDetails />} />
            <Route path='/add-listing' element={<AddListingOption />} />
            <Route path='/add-sale' element={<AddSale />} />
            <Route path='/add-lease' element={<AddLease />} />
            <Route path='/my-listings' element={<MyListings />} />
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
