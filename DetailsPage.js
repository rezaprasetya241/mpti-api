import React, { useEffect, useState } from 'react'
import HighlightProduct from '../components/HighlightProduct/HighlightProduct'
import './styles/DetailsPage.style.css'
import Product from '../assets/product1.png'
import { BsCart4 } from 'react-icons/bs'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper";
import axios from 'axios'

export default function DetailsPage() {

    let {id} = useParams()
    let navigate = useNavigate()
    const [productObject, setProductObject] = useState({})
    // let sumParfum = 0;

    useEffect(() => {
        axios.get(`http://localhost:3001/product/products/${id}`).then((response) => {
            setProductObject(response.data)
        })
    }, [])

    // const addToCart = () => {
    //     axios.get(`http://localhost:3001/product/products/${id}`).then((response) => {
    //         console.log(response.data)
    //     })
    // }

    const addToCart = (productObject) => {
        const sumParfum = 1;
        axios.post(`http://localhost:3001/product/add/${id}`, {
            titleParfum: productObject.title,
            urlParfum: productObject.urlPic,
            sumParfum: sumParfum,
            priceParfum: productObject.priceMl
        }).then((response) => {
            console.log(response);
            navigate("/cart");
        })
    }

  return (
    <div className='detailsPage'>
        <div style={{height: '100px'}}></div>
        <div className='detailsPage__headbar'>
            <div className='container'>
                <div className='detailsPage__link'>
                    <Link to='/'>Home</Link>
                    <i>/</i>
                    <Link to='/details' className='fw-bold'>Finished Parfume</Link>
                </div>
            </div>
        </div>
        <div className='container'>
            <Row className='detailsPage__parfume'>
                <Col className='detailsPage__parfume__img' md={6}>
                    <div className='detailsPage__parfume__img__main'>
                        <img src={productObject.urlPic} alt="parfume 1"/>
                    </div>
                    <div className='detailsPage__parfume__img__list' >
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        freeMode={true}
                        pagination={{
                        clickable: false,
                        }}                  
                        breakpoints={{
                            0: {
                            slidesPerView: 3,
                            },
                            520: {
                            slidesPerView: 3,
                            },
                            950: {
                            slidesPerView: 4,
                            },

                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper">
                        <SwiperSlide>
                            <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        </SwiperSlide>
                        
                    </Swiper>
                        {/* <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/>
                        <img src={Product} alt="parfume 1" style={{width: "110px", height: "110px"}}/> */}
                    </div>
                </Col>
                <Col className='detailPage__parfume__desc' md={6}>
                    <div className='detailPage__parfume__desc__text'>
                            <h3>{productObject.title}</h3>
                            <p className='fw-bold'>Rp {productObject.priceMl} / ML</p>
                            <div className='detailPage__parfume__desc__btn'>
                                <button>Choose your scent</button>
                                <button onClick={()=>{addToCart(productObject)}}><BsCart4 className='bsCart'/> Add to Cart</button>
                            </div>
                            <div className='detailsPage__parfume__desc__details'>
                                <p className='fw-bold'>About the Product</p>
                                <p>
                                {productObject.descripsi}<br/>    
                                </p>
                            </div>

                    </div>
                </Col>
            </Row>
        </div>
        {/* Highlight produck */}
        <div className='detailsPage__listHighlight'>
            <div className='container'>
                <div className='highlight__title'>
                    <h1 className='text-start'>Recommended fragrances that are suitable for you</h1>
                </div>
                <HighlightProduct/>
            </div>
        </div>
    </div>
  )
}
