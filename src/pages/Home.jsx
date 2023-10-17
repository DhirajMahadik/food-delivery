import React, { useState, useContext } from 'react'
import { BsCartFill } from 'react-icons/bs'
import jsonData from '../products/products.json'
import Context from '../context/Context'
import SearchBar from '../styled/SearchBar'
import { addToCart } from '../redux/slices/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../footer/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [data, setData] = useState(jsonData)

    const state = useContext(Context)

    const cart_products = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const bannerStyle = {
        backgroundImage: `url(${"https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg?cs=srgbdl=pexels-fidel-hajj-2814828.jpg&fm=jpg&_gl=1*ejkp52*_ga*MTM0MTU0Njc4MC4xNjY5MTQyMTc0*_ga_8JE65Q40S6*MTY3NTI3MTMyMS4yLjEuMTY3NTI3MTczMy4wLjAuMA.."})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no repeat',
        height: '50vh'
    }

    const viewProductHandler = (product) => {
        state.setViewProduct(product)
        state.setViewProductModal(true)
    }

    const searchHandler = (e) => {
        let value = e.target.value;
        if (value === '') {
            setData(jsonData)
        } else {
            let searchResult = jsonData.filter((element) => {
                return element.description.toLowerCase().includes(value.toLowerCase())
            })
            setData(searchResult)
        }
    }

    return (
        <>
            <div className='d-flex' style={bannerStyle}>
                <div className='m-auto'>
                    <div className='p-4 rounded' style={{ backgroundColor: '#00000060' }}>
                        <h1 className='fw-bold text-warning text-center fst-italic'>Welcome to MyRestro</h1>
                        <SearchBar >
                            <form className=''>
                                <input type="text" className='form-control text-light fw-bold' placeholder='Search' onChange={(e) => searchHandler(e)} />
                            </form>
                        </SearchBar>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column bg-dark text-light h-100'>
                <div className='mx-auto d-flex align-items-center my-2'>
                    <h2 className='text-center'>Food Items</h2>
                    <div onClick={() => navigate('/check-out')} className="cart position-relative mx-4" style={{ width: 'fit-content' }}>
                        <div><BsCartFill role='button' color='#fff' size={20} /></div>
                        {cart_products.length >= 1 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            <span className="mt-2">  {cart_products.length}</span>
                        </span>}
                    </div>
                </div>
                <hr className='p-0 m-0' />
                <div className="container  py-4">
                    <div className='row'>
                        {
                            data.slice(0, 9).map((product, index) => {
                                return <div key={index} className="col-md-6 col-lg-4 col-6 mb-3" >
                                    <div className="card mb-3 " >
                                        <div className="row g-0">
                                            <div className="col-md-4" role='button' onClick={() => viewProductHandler(product)}>
                                                <img src={product.image} className="img-fluid rounded-start" alt="..." style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body ">
                                                    <h6 className="card-title" role='button' onClick={() => viewProductHandler(product)}>{product.product_name.slice(0, 26)}...</h6>
                                                    <p className="card-text" style={{ fontSize: '13px', margin: "2px 0" }}>{product.description.slice(0, 50)}...</p>
                                                    <p> Price : {product.price}/-</p>
                                                    <button className="btn btn-sm btn-danger" onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home