import React, { useEffect, useState } from 'react'
// Import Img
import search from '../../assets/img/svg/search.svg'


const SideBar = (props) => {

    useEffect(() => {
        document.querySelectorAll("input[type='radio']").forEach((input) => {
            input.addEventListener('change', function () {
                props.filterEvent(input.value,0);
            });
        });

        document.querySelector("input[type='range']").addEventListener('change', function (e) {
            setPrice(e.target.value);
            props.filterEvent(e.target.value,2);
        });

    }, [props])

    const [price, setPrice] = useState(10000)

    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form>

                            <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>props.filterEvent(e.target.value,1)}/>
                            <button><img src={search} alt="img" /></button>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Categories</h4>
                        <form>
                            <label className="custom_boxed">All
                                <input type="radio" name="radio" value="All" defaultChecked />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Jackets
                                <input type="radio" name="radio" value="Jackets"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Bottoms
                                <input type="radio" name="radio" value="Bottoms"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">T-shirts
                                <input type="radio" name="radio" value= "T-shirt"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Fashion
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Jeans
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Price</h4>
                        <div className="price_filter">
                            <input type="range" min="500" max="15000" defaultValue={price} className="form-control-range" id="formControlRange" />
                            <div className="price_slider_amount mt-2">
                                <span>Price : {price}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default SideBar
