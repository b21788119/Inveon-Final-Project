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

                            <input type="text" className="form-control" placeholder="Ara..." onChange={(e)=>props.filterEvent(e.target.value,1)}/>
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
                            <label className="custom_boxed">T-shirts
                                <input type="radio" name="radio" value= "T-shirt"/>
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Fashion
                                <input type="radio" name="radio" />
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
                            <label className="custom_boxed">Jeans
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Fiyat</h4>
                        <div className="price_filter">
                            <input type="range" min="500" max="15000" defaultValue={price} className="form-control-range" id="formControlRange" />
                            <div className="price_slider_amount mt-2">
                                <span>Fiyat : {price}</span>
                            </div>
                        </div>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Renk</h4>
                        <div className="product-variable-color">
                            <label htmlFor="modal-product-color-red6">
                                <input name="modal-product-color" id="modal-product-color-red6" className="color-select"
                                    type="radio" />
                                <span className="product-color-red"></span>
                            </label>
                            <label htmlFor="modal-product-color-tomato1">
                                <input name="modal-product-color" id="modal-product-color-tomato1"
                                    className="color-select" type="radio" />
                                <span className="product-color-tomato"></span>
                            </label>
                            <label htmlFor="modal-product-color-green2">
                                <input name="modal-product-color" id="modal-product-color-green2"
                                    className="color-select" type="radio" defaultChecked />
                                <span className="product-color-green"></span>
                            </label>
                            <label htmlFor="modal-product-color-light-green3">
                                <input name="modal-product-color" id="modal-product-color-light-green3"
                                    className="color-select" type="radio" />
                                <span className="product-color-light-green"></span>
                            </label>
                            <label htmlFor="modal-product-color-blue4">
                                <input name="modal-product-color" id="modal-product-color-blue4" className="color-select"
                                    type="radio" />
                                <span className="product-color-blue"></span>
                            </label>
                            <label htmlFor="modal-product-color-light-blue5">
                                <input name="modal-product-color" id="modal-product-color-light-blue5"
                                    className="color-select" type="radio" />
                                <span className="product-color-light-blue"></span>
                            </label>
                        </div>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Boyut</h4>
                        <form id="sizes_input">
                            <label className="custom_boxed">XS
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">S
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">M
                                <input type="radio" name="radio" defaultChecked />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">L
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">XL
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <h4>Marka</h4>
                        <form>
                            <label className="custom_boxed">Next
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Adidas
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Calvin Klein
                                <input type="radio" name="radio" defaultChecked />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Nike
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Geox
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="custom_boxed">Vakko
                                <input type="radio" name="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <div className="clear_button">
                                <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={() => { props.filterEvent(1) }}>Filtreyi Temizle</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
