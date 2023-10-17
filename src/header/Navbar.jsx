import { BsCartFill, BsFillPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../context/Context'
import { useSelector } from 'react-redux'


const Navbar = () => {

    const { isLogin, setIsLogin, setLoginModal, user } = useContext(Context)

    const cart_products = useSelector((state) => state.cart)

    const logoutHandler = () => {
        localStorage.removeItem('auth_token')
        setIsLogin(false)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg  navbar-dark position-fixed sticky-top w-100 z-1 py-3" style={{ backgroundColor: '#000000b0' }}>
                <div className="container ">
                    {!isLogin ? <span className=" btn btn-sm btn-success" role='button' onClick={() => setLoginModal(true)}>Login</span> : <div className=" dropdown text-light">
                        <span className="d-flex  align-items-center " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <BsFillPersonFill color='#fff' size={20} className='mx-1' /> {user.name && user.name}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-dark ">
                            <li role='button' className="dropdown-item" onClick={logoutHandler} >Logout</li>
                        </ul>
                    </div>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse justify-content-end navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link text-light fw-bold" to="/">Home</Link>
                            <div className="position-relative" style={{ width: 'fit-content' }}>
                                <Link className="nav-link" to="/check-out" ><BsCartFill color='#fff' size={20} /></Link>
                                {cart_products.length >= 1 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    <span className="mt-2">  {cart_products.length}</span>
                                </span>}
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar