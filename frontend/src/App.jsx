import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import summaryURL from './common'
import Context from './context/AuthContext'
import { useDispatch } from 'react-redux'
import { setUserDetail } from './store/userSlice'

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchDetailUser = async () => {
    const dataResponse = await fetch(summaryURL.userDetail.url, {
      method: summaryURL.userDetail.method,
      credentials: 'include'
    })
    const result = await dataResponse.json();
    if (result.success) {
      dispatch(setUserDetail(result.data));
    }
  }

  const fetchCountProductInCart = async() => {
    const dataResponse = await fetch(summaryURL.countCartProduct.url, {
      method: summaryURL.countCartProduct.method,
      credentials: 'include'
    })
    const result = await dataResponse.json();
    setCartProductCount(result?.data?.count);
    
  }

  useEffect(() => {
    fetchDetailUser();
    fetchCountProductInCart();
  })


  return (
    <>
      <Context.Provider value={{
        fetchDetailUser,
        cartProductCount,
        fetchCountProductInCart
      }}>
        <ToastContainer autoClose="2000" />
        <Header />
        <main className='min-h-[calc(100vh)] pt-16'>
          <Outlet />
        </main>
        <Footer />

      </Context.Provider>
    </>
  )
}

export default App
