import { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { useSelector } from "react-redux";

const GlobalContext = (props) => {

   
    const [user,setUser] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [viewProduct, setViewProduct] = useState({})
    const [viewProductModal, setViewProductModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [cost , setCost] = useState(0)

    const token = localStorage.getItem('auth_token')

    const cart_products = useSelector((state)=>state.cart)

    const getUserDetails = (value) =>{
        axios({url:'http://127.0.0.1:5500/api/user-details',method:'POST',headers:{"authorization":`Bearer ${value === null ? JSON.parse(token) : value }`}})
        .then((response)=>{
            setUser(response.data)
            console.log(response.data)
        })
    }

    const getTotalCost = () =>{
        let ammount = 0
        for(let i = 0; i<cart_products.length; i++){
            ammount += cart_products[i].price
        }
        setCost(ammount )
      }

    console.log(user)

    useEffect(()=>{
        getTotalCost()
        if(token){
            setIsLogin(true)
            getUserDetails(null)
        }
    },[])

    return (
        <Context.Provider value={{ user, setUser,isLogin, setIsLogin, viewProduct, setViewProduct, viewProductModal, setViewProductModal,loginModal,setLoginModal,getUserDetails,getTotalCost,cost}}>
            {props.children}
        </Context.Provider>
    )
}

export default GlobalContext