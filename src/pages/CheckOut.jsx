import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../redux/slices/cart-slice"
import { BiRupee } from 'react-icons/bi'
import { useEffect, useContext } from "react"
import axios from "axios"
import Context from "../context/Context"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const CheckOut = () => {

  const { user, isLogin, cost, getTotalCost } = useContext(Context)

  const cart_products = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const makePayment = async () => {

    let getKey = await axios({ url: `${process.env.REACT_APP_URL}/api/get-key` })

    axios({ url: `${process.env.REACT_APP_URL}/api/make-payment`, method: 'POST', data: { cost } })
      .then((response) => {
        const order = response
        const options = {
          key: getKey.data.key,
          amount: order.data.amount,
          currency: "INR",
          name: "MyRestro",
          description: "Test Transaction",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFipiuZpzX5NWOG3qo68DOyK6UbxZk9TDoVg&usqp=CAU",
          order_id: order.data.id,
          callback_url: `${process.env.REACT_APP_URL}/api/verify-payment/${user.id}`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };

        const payment = new window.Razorpay(options);
        payment.open();

      }).catch((error) => {
        if (error.response) {
          toast.error(error.response.data.error)
        } else {
          toast.error(error.message)
        }
      })

  }

  const removeItems = (id) => {
    dispatch(removeFromCart(id))
  }

  useEffect(() => {
    getTotalCost()
    // eslint-disable-next-line
  }, [removeItems])

  return (
    <>
      <ToastContainer position="top-center" theme="light" autoClose={3000} />
      <div className="d-flex flex-column my-4">
        <div className="container my-4">
          <div className="my-4">
            <h2 className="my-4 py-2 fw-bolder  text-center">Selected items</h2>
          </div>
          <hr />
          <div className="row pb-5" style={{ height: '-webkit-fill-availabal', overflow: 'auto' }}>
            {
              cart_products.length >= 1 ? cart_products.map((product, index) => {
                return <div key={index} className="col-md-6 col-12">
                  <div className="card mb-3 ">
                    <div className="row g-0">
                      <div className="col-md-3 p-2 d-flex">
                        <img src={product.image} className="img-fluid rounded m-auto" alt="..." />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <span className="card-title fw-bold">{product.product_name}</span>
                          <br />
                          <span className="card-text" style={{ fontSize: '12px' }}>{product.description.slice(0.50)}</span>
                          <br />
                          <span className="card-text fw-600 ">Rs. {product.price} /-</span>
                          <br />
                          <span className="card-text"><small role="button" className="text-danger" onClick={() => removeItems(product.id)}>remove</small></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }) : <div className="m-auto">
                <h5 className="text-center text-secondary">Your cart is empty</h5>
              </div>}
          </div>
          <div className="container d-flex flex-column fixed-bottom my-4 bottom-5 " style={{zIndex:'auto'}} >
            <div className="d-flex bg-light justify-content-end align-items-center px-2 py-2"><span className="align-items-center">Total:<BiRupee size={18} />{cost} </span></div>
            <div className={`btn btn-success w-100 ${isLogin ? cart_products.length < 1 && "disabled" : "disabled"}`} onClick={makePayment}>{!isLogin && "Login to"} Proceede To Pay</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default CheckOut