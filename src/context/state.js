import { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const GlobalContext = (props) => {


    const [user, setUser] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [viewProduct, setViewProduct] = useState({})
    const [viewProductModal, setViewProductModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [cost, setCost] = useState(0)

    const token = localStorage.getItem('auth_token')

    const cart_products = useSelector((state) => state.cart)

    const getUserDetails = (value) => {
        axios({ url: `${process.env.REACT_APP_URL}/api/user-details`, method: 'POST', headers: { "authorization": `Bearer ${value === null ? JSON.parse(token) : value}` } })
            .then((response) => {
                setUser(response.data)
            }).catch((error) => {
                toast.error(error.message)
            })
    }

    const getTotalCost = () => {
        let ammount = 0
        for (let i = 0; i < cart_products.length; i++) {
            ammount += cart_products[i].price
        }
        setCost(ammount)
    }

    useEffect(() => {
        getTotalCost()
        if (token) {
            setIsLogin(true)
            getUserDetails(null)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Context.Provider value={{ user, setUser, isLogin, setIsLogin, viewProduct, setViewProduct, viewProductModal, setViewProductModal, loginModal, setLoginModal, getUserDetails, getTotalCost, cost }}>
            <ToastContainer position="top-center" theme="light" autoClose={3000} />
            {props.children}
        </Context.Provider>
    )
}

export default GlobalContext