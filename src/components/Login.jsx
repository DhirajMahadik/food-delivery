import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import Context from '../context/Context'


const Login = () => {

    const [data, setData] = useState({ email: '', password: '' })
    const [signUpdata, setSignUpdata] = useState({ name: '', phone: '', email: '', password: '', confirmP: '' })
    const [type, setType] = useState('login')

    const state = useContext(Context)

    const SignInHandler = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, data)
            .then((response) => {
                localStorage.setItem('auth_token', JSON.stringify(response.data.token))
                state.setIsLogin(true)
                setData({ email: '', password: '' })
                state.getUserDetails(response.data.token)
                state.setLoginModal(false)
            }).catch((error) => {
                if(error.response){
                    toast.error(error.response.data.error)
                }else{
                    toast.error(error.message)
                }
            })
    }

    const SignUpHandler = (e) => {
        e.preventDefault();
        if (signUpdata.password === signUpdata.confirmP) {
            axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, signUpdata)
                .then((response) => {
                    setSignUpdata({ name: '', phone: '', email: '', password: '', confirmP: '' })
                    setType('login')

                }).catch((error) => {
                    toast.error(error.message)
                })
        } else {
            toast.error('password not matched')
        }

    }

    const onchangeHanderSignIn = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onchangeHanderSignUp = (e) => {
        setSignUpdata({ ...signUpdata, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    })

    return (
        <>
            <ToastContainer position='top-center' theme='light' autoClose={3000} />
            {type === 'login' ? <div className='container-fluid position-absolute d-flex z-2 ' style={{ height: '100vh', backgroundColor: '#00000099' }}>
                <div className="d-flex p-3 flex-column bg-light m-auto position-sticky bg-secondary" style={{ height: '350px', width: '400px', borderRadius: '10px' }}>
                    <div className='d-flex justify-content-end'><CiCircleRemove role='button' onClick={() => state.setLoginModal(false)} size={25} /></div>
                    <form className='m-auto w-75' onSubmit={SignInHandler}>
                        <div className="d-flex justify-content-center py-2">
                        </div>
                        <div className="py-2">
                            <label className='form-lable' htmlFor="email">Email</label>
                            <input required className='form-control' type="text" name='email' id='email' value={data.email} onChange={onchangeHanderSignIn} />
                        </div>
                        <div className="py-2">
                            <label className='form-lable' htmlFor="password">Password</label>
                            <input required className='form-control' type="password" name='password' id='password' value={data.password} onChange={onchangeHanderSignIn} />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center py-2">
                            <button type="submit" className='btn btn-success my-2' > Sing IN</button>
                            <span role='button' onClick={() => setType('register')}><u>Sign Up</u></span>
                        </div>
                    </form>
                </div>
            </div> :
                <div className='container-fluid position-absolute d-flex z-1' style={{ height: '100vh', backgroundColor: '#00000099' }}>
                    <div className="d-flex p-3 flex-column bg-light m-auto position-sticky bg-secondary" style={{ width: '400px', borderRadius: '10px' }}>
                        <div className='d-flex justify-content-end'><CiCircleRemove role='button' onClick={() => state.setLoginModal(false)} size={25} /></div>
                        <form className='m-auto w-75' onSubmit={SignUpHandler}>
                            <div className="d-flex justify-content-center py-2">
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="name">Full Name</label>
                                <input required className='form-control' type="text" name='name' id='name' value={signUpdata.name} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="phone">Phone</label>
                                <input required className='form-control' type="number" name='phone' id='phone' value={signUpdata.phone} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="email">Email</label>
                                <input required className='form-control' type="email" name='email' id='email' value={signUpdata.email} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="confirmP">Password</label>
                                <input required className='form-control' type="password" name='password' id='confirmP' value={signUpdata.password} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="password">Confirm Password</label>
                                <input required className='form-control' type="password" name='confirmP' id='password' value={signUpdata.confirmP} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center py-2">
                                <button type="submit" className='btn btn-success my-2' >Sign Up</button>
                                <span role='button' className='nav-link' onClick={() => setType('login')}> <u>Sign In</u></span>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default Login