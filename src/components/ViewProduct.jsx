import ViewProductStyled from "../styled/ViewProduct"
import {AiFillCloseCircle} from 'react-icons/ai'
import { useContext } from "react"
import Context from "../context/Context"

const ViewProduct = ({ product }) => {
    
    const state = useContext(Context)

    return (
        <ViewProductStyled className='d-flex position-fixed  z-1 w-100 '>

            <div class="card m-auto" >
                <div className="position-absolute z-1 end-0">
                    <AiFillCloseCircle role="button" color="#000" size={25} className="m-2" onClick={()=> state.setViewProductModal(false)}/>
                </div>
                <div class="row g-0">
                    <div class="col-md-4 ">
                        <img src={product.image} class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title text-center">{product.product_name}</h4>
                            <h5 class="card-text">{product.description}</h5>
                            <h6 class="card-text">Price : {product.price} /-</h6>
                            <div className="d-flex">
                            <button  className="btn btn-danger m-auto">Add to Cart</button>
                            </div>
                       

                        </div>
                    </div>
                </div>
            </div>

        </ViewProductStyled>
    )
}

export default ViewProduct