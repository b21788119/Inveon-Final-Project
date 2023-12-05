import React, { useState } from 'react'
import SideBar from './SideBar'
import ProductCard from '../Common/Product/ProductCard'
import { useSelector } from "react-redux";
import TopHeader from '../Common/Header/TopHeader';


const LeftSideBar = () => {
   
    const [products, setProducts] = useState(useSelector((state) => state.products.products))
    const [page, setPage] = useState(1)
    let allData = [...useSelector((state) => state.products.products)];
    const [filters,setFilters] = useState([null,null,10000]);
    

    const randProduct = (page) => {
        if(page){
            let data = products.sort((a, b) => 0.5 - Math.random())
            setProducts(data);
            setPage(page);
        }
    }

    const filterProducts = (query,parameter) => {
        // Filter by category
        if(parameter == 0){
            query === "All" ? filters[0]=null : filters[0] = query;
            setFilters(filters);
            applyAllFilters();

        }
        // Filter by name
        else if(parameter == 1){
            query === "" ? filters[1] = null : filters[1] = query;
            filters[1] = query;
            setFilters(filters);
            applyAllFilters();

        }
        // Filter by price
        else if(parameter == 2){
            filters[2] = query;
            setFilters(filters);
            applyAllFilters();

        }
      
    }

    const applyAllFilters = ()=>{
        var filteredData = allData;

        if(filters[0]){
            filteredData = filteredData.filter(data=> data.categoryName === filters[0]);
        }

        if(filters[1] != null){
            filteredData = filteredData.filter(data=> data.name.toLowerCase().includes( filters[1].toLowerCase()));
            
        }

        filteredData = filteredData.filter(data=> data.price <= filters[2]);

        setProducts(filteredData);


    }


    return (
        <>
            <section id="shop_main_area" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <SideBar filterEvent={filterProducts}/>
                        <div className="col-lg-9">
                            <div className="row">
                                {products.slice(0,9).map((data, index) => (
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={index}>
                                        <ProductCard data={data} />
                                    </div>
                                ))}
                                <div className="col-lg-12">
                                    <ul className="pagination">
                                        <li className="page-item" onClick={(e) => { randProduct(page >1?page-1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                            </a>
                                        </li>
                                        <li className={"page-item "+ (page === 1?"active":null)} onClick={(e) => { randProduct(1) }}><a className="page-link" href="#!">1</a></li>
                                        <li className={"page-item "+ (page === 2?"active":null)}  onClick={(e) => { randProduct(2) }}><a className="page-link" href="#!">2</a></li>
                                        <li className={"page-item "+ (page === 3?"active":null)}  onClick={(e) => { randProduct(3) }}><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item" onClick={(e) => { randProduct(page <3?page+1:0) }}>
                                            <a className="page-link" href="#!" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftSideBar
