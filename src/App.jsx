import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { setUser } from './redux/user/userSlice'
import { AssignCount } from './redux/cart/cartSlice'
import { useDispatch, useSelector } from "react-redux";

import Header from "./component/Header"
import Footer from './component/Footer'
import Cookies from 'js-cookie';

function App() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const token = Cookies.get('access_token');

  useEffect(() => {
    const getUserdetails = async () => {
      const res = await fetch('/api/user/get-user');
      const data = await res.json();

      if (data.success == false) {
        return
      }
      dispatch(setUser(data.user));
    }
    const getCartCount = async () => {
      const res = await fetch('/api/cart/cart-count');
      const data = await res.json();

      if (data.success == false) {
        return
      }

      dispatch(AssignCount(data.count));
    }

    if (token) {
      getUserdetails();
      getCartCount();
    }
  }, [token,currentUser]);

  return (
    <>
      <Header />
      <div className="min-h-screen h-full pt-16 -z-10">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
