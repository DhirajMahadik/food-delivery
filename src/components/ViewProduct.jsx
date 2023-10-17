import ViewProductStyled from "../styled/ViewProduct"
import { AiFillCloseCircle } from 'react-icons/ai'
import { useContext } from "react"
import Context from "../context/Context"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cart-slice"
import { toast } from 'react-toastify'

const ViewProduct = ({ product }) => {

    const state = useContext(Context)
    const dispatch = useDispatch()

    const addToCartHandler = (product)=>{
        dispatch(addToCart(product))
        toast.success('Product added to cart',{autoClose:1000,theme:'light'})
    }

    return (
        <ViewProductStyled className='d-flex position-fixed  z-1 w-100 '>

            <div className="card m-auto" >
                <div className="position-absolute z-1 end-0">
                    <AiFillCloseCircle role="button" color="#000" size={25} className="m-2" onClick={() => state.setViewProductModal(false)} />
                </div>
                <div className="row g-0">
                    <div className="col-md-4 ">
                        <img src={product.image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title text-center">{product.product_name}</h4>
                            <h5 className="card-text">{product.description}</h5>
                            <h6 className="card-text">Price : {product.price} /-</h6>
                            <div className="d-flex">
                                <button className="btn btn-danger m-auto" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </ViewProductStyled>
    )
}

export default ViewProduct