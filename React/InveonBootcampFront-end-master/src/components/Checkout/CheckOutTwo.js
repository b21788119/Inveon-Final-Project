import React,{useRef,useState } from 'react'
import TopLogin from './TopLogin'
import YourOrder from './YourOrder'

import { useDispatch, useSelector} from "react-redux";

const CheckOutTwo = () => {
    let detailsMap = useSelector((state) => state.shoppingCard.detailsMap);
    const formRef = useRef();

    const [form, setForm] = useState({});

    const handleForm = (name, value) => {
        setForm({[name]: value});
   }

    return (
        <>
            <section id="checkout_two" className="ptb-100">
            <div class="card">
                <div class="card-header">
                    Details
                </div>
                <div class="card-body">
                <div className="container">
                    <div className="row">
                        <TopLogin />
                        <div className="col-lg-12">
                            <div className="checkout_area_two">
                                <div className="row">
                                    {detailsMap.size != 0 ? <div className="col-lg-6 col-md-6">
                                        <div className="checkout_form_area">
                                            <h3>Ticket Address</h3>
                                            <form ref={formRef} action="#">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label >Name<span className="text-danger">*</span></label>
                                                            <input name="First Name" onChange={(e)=>handleForm('FirstName', e.target.value)} type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Surname <span className="text-danger">*</span></label>
                                                            <input name="Last Name" onChange={(e)=>handleForm('LastName', e.target.value)} type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Company<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label htmlFor="country">Country<span className="text-danger">*</span></label>
                                                            <select className="country_option nice-select wide form-control"
                                                                name="country" id="country">
                                                                <option defaultValue="2">Bangladesh</option>
                                                                <option defaultValue="3">Algeria</option>
                                                                <option defaultValue="4">Afghanistan</option>
                                                                <option defaultValue="5">Ghana</option>
                                                                <option defaultValue="6">Albania</option>
                                                                <option defaultValue="7">Bahrain</option>
                                                                <option defaultValue="8">Colombia</option>
                                                                <option defaultValue="9">Dominican Republic</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Street Name<span className="text-danger">*</span></label>
                                                            <input placeholder="Cadde Adı" type="text"
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <input placeholder="Numara"
                                                                type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>City<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Country<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Phone Number <span className="text-danger">*</span></label>
                                                            <input name="Phone" onChange={(e)=>handleForm('Phone', e.target.value)} type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label> Email<span className="text-danger">*</span></label>
                                                            <input name="Email" onChange={(e)=>handleForm('Email', e.target.value)} type="text" className="form-control" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="order-notes">
                                                            <label htmlFor="order_note">Additional Notes<span className="text-danger">*</span></label>
                                                            <textarea id="order_note"
                                                                placeholder=""
                                                                className="form-control" rows="5"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div> : ""}
                                    <YourOrder data={formRef}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                   
                </div>
                </div>

                
            </section>
        </>
    )
}

export default CheckOutTwo