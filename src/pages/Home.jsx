import React, { useState,useContext } from 'react'
import jsonData from '../products/products.json'
import Context from '../context/Context'
import SearchBar from '../styled/SearchBar'
import { addToCart } from '../redux/slices/cart-slice'
import { useDispatch } from 'react-redux'
import Footer from '../footer/Footer'


const Home = () => {

    const [data, setData] = useState(jsonData)

    const state = useContext(Context)
    
    const dispatch = useDispatch()

    const bannerStyle = {
        // backgroundImage: `url(${"https://media.smallbiztrends.com/2023/03/Most-Profitable-Types-of-Restaurants.png"})`,
        backgroundImage: `url(${"https://images.pexels.com/photos/2814828/pexels-photo-2814828.jpeg?cs=srgbdl=pexels-fidel-hajj-2814828.jpg&fm=jpg&_gl=1*ejkp52*_ga*MTM0MTU0Njc4MC4xNjY5MTQyMTc0*_ga_8JE65Q40S6*MTY3NTI3MTMyMS4yLjEuMTY3NTI3MTczMy4wLjAuMA.."})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no repeat',
        height: '50vh'
    }

    const viewProductHandler = (product) =>{
        state.setViewProduct(product)
        state.setViewProductModal(true)
    }

    const searchHandler = (e) =>{
        let value = e.target.value;
        console.log(value)
        if(value === ''){
            setData(jsonData)
        }else{
            let searchResult = jsonData.filter((element)=>{
                return element.description.toLowerCase().includes(value.toLowerCase())  
            })
            console.log(searchResult)
            setData(searchResult)
        }        
    }

    return (
        <>
            <div className='d-flex' style={bannerStyle}>
                <div className='m-auto'>
                    <div className='p-4 rounded' style={{backgroundColor:'#00000060'}}>
                        <h1 className='fw-bold text-warning text-center fst-italic'>Welcome to MyRestro</h1>
                        <SearchBar >
                            <form className=''>
                                <input type="text" className='form-control text-light fw-bold' placeholder='Search' onChange={(e)=> searchHandler(e)} />
                            </form>
                        </SearchBar>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column bg-dark text-light h-100'>
                <div className='mx-auto my-2'>
                    <h2 className='text-center'>Food Items</h2>
                </div>
                <hr className='p-0 m-0' />
                <div className="container  py-4">
                    <div className='row'>
                        {
                            data.slice(0,9).map((product, index) => {
                                return <div key={index} className="col-md-4 col-6 mb-3" >
                                    <div class="card mb-3 " >
                                        <div class="row g-0">
                                            <div class="col-md-4" role='button' onClick={()=>viewProductHandler(product)}>
                                                <img src={product.image} class="img-fluid rounded-start" alt="..." style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }} />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body ">
                                                    <h6 class="card-title" role='button' onClick={()=>viewProductHandler(product)}>{product.product_name.slice(0, 26)}...</h6>
                                                    <p class="card-text" style={{ fontSize: '13px' }}>{product.description.slice(0, 50)}...</p>
                                                    <p> Price : {product.price}/-</p>
                                                    <button  class="btn btn-sm btn-danger" onClick={()=> dispatch(addToCart(product))}>Add to Cart</button>
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
            <Footer/>
        </>
    )
}

export default Home