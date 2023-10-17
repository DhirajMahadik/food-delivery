import React from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import Footer from '../footer/Footer'
import PaymentConfirmationStyled from '../styled/PaymentConfirmation'
import { useParams } from 'react-router'

const PaymentConfirmation = () => {

    const { status, reference } = useParams()

    return (
        <>
            <PaymentConfirmationStyled className='container d-flex'>
                <div className="m-auto p-4">
                    {
                        status === 'success' ? <div className='d-flex flex-column'>
                            <h1 className='text-center'>{<BsCheck2Circle color='green' size={50} />}</h1>
                            <h1 className='text-success text-center fw-bold'>Payment Received</h1>
                            <h6 className='text-center'>Transaction ID : {reference}</h6>
                        </div> : <div className='d-flex flex-column'>
                            <h1 className='text-center'>{<ImCross color='red' size={50} />}</h1>
                            <h1 className='text-danger text-center fw-bold'>Payment Failed</h1>
                            <h6 className='text-center'>Transaction ID : {reference}</h6>
                        </div>
                    }
                </div>
            </PaymentConfirmationStyled>
            <Footer />
        </>
    )
}

export default PaymentConfirmation