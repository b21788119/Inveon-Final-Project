import Heading from "../Heading"
import React, { useEffect } from "react"
import { ProductData } from "../../../app/data/ProductData";
import { useSelector, useDispatch }  from "react-redux";
import { getAllProducts, getProductByID, getProductsByCategory } from "../../../app/Actions/Index";
import ProductCard from "../../../components/Common/Product/ProductCard"; 

const HotProduct = () => {

    let products = useSelector((state)=>state.products.products);

    const getRandomProduct = () => {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex].imageUrl;
      };

    const TumUrunler = useSelector((state) => state.products.products);
    const healthy = useSelector((state) => state.products.healthy);
    const snacks = useSelector((state) => state.products.snacks);
    const dessert = useSelector((state) => state.products.dessert);
    const gluten_free = useSelector((state) => state.products.gluten_free);
    const italian = useSelector((state) => state.products.italian);
    const seasonal = useSelector((state) => state.products.seasonal);
  
  
    return(
        <>
        <section id="hot-Product_area" className="ptb-100">
             <div className="container">
                <Heading baslik="Best Sellers" 
                 />
                 <div className="row">
                  <div className="col-lg-12">
                    <div className="tabs_center_button">
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="tabs_el_wrapper">
                        <div className="tab-content">
                            <div id="new_arrival" className="tab-pane fade show in active">
                                <div className="row">
                               {products.slice(5,9).map((product,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index++}>
                                    <ProductCard data={product} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="trending" className="tab-pane fade">
                            <div className="row">
                               {products.map((product, index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index++}>
                                    <ProductCard data={product} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="best_sellers" className="tab-pane fade">
                            <div className="row">
                               {products.map((product,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index++}>
                                    <ProductCard data={product} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="featured" className="tab-pane fade">
                            <div className="row">
                               {products.map((product,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index++}>
                                    <ProductCard data={product} />
                                    </div>
                               ))}
                               </div>
                            </div>
                            <div id="on_sall" className="tab-pane fade">
                            <div className="row">
                               {ProductData.slice(7,13).map((product,index)=> (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index++}>
                                    <ProductCard data={product} />
                                    </div>
                               ))}
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

export default HotProduct