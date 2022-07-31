import React, {useEffect, useState, useContext} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import './styles/CartPage.style.css'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Jne from '../assets/jne.png'
import Jnt from '../assets/jnt.png'
import Axios from 'axios'
// import { AuthContext } from "../helpers/AuthContext";

export default function () {
    let num = 1;
    let navigate = useNavigate()

    // const { authState } = useContext(AuthContext);
    const [catalog, setCatalog] = useState([])
    const [fullName, setFullName] = useState('')
    const [alamat, setAlamat] = useState('')
    const [noHp, setNoHp] = useState('')
    const [courier, setCourier] = useState('')

    // kalau belum login pindah ke halaman login
    useEffect(() =>{
        Axios.get('http://localhost:3001/cart').then((response)=>{
            // if(response.data.message){
                setCatalog(response.data)
            // }else{
            //     navigate("/login")
            // }
        })
    }, [])

    const remove = (id) => {
        Axios.delete(`http://localhost:3001/cart/${id}`).then(() => {
            alert("Item removed from cart")
        })
    }

    const checkout = () => {
        const data = {fullName: fullName, alamat: alamat, noHp: noHp, kurir: courier}
        Axios.post("http://localhost:3001/transaction/add", data).then(() => {
            alert("Checkout success")
        })
    }
  return (
    <div>
        <div style={{height: '100px'}}></div>
        <div className='detailsPage__headbar'>
            <div className='container'>
                <div className='detailsPage__link'>
                    <Link to='/'>Home</Link>
                    <i>/</i>
                    <Link to='/cart' className='fw-bold'>Shopping Cart</Link>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='cartPage'>
                <Row>
                    <Col md={8}>
                        <div className='shoppingCart'>
                            <h3>Shopping Cart</h3>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className='text-start'>Photo</th>
                                        <th className='text-start'>Product</th>
                                        <th className='text-start'>Price</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {catalog.map((val)=>{
                                        return(
                                            <tr className='list-catalog' key={val.id} style={{border: 'transparent'}}>
                                                {/* */}
                                                <td>{num++}</td>
                                                <td>
                                                <img src={val.urlParfum} alt="" style={{width: '90px', height: '90px', borderRadius: '10px'}}/>
                                                </td>
                                                <td>
                                                    <h5>{val.titleParfum}</h5>
                                                    <p>{val.sumParfum}</p>
                                                </td>
                                                <td>IDR {val.priceParfum}</td>
                                                <td className='text-center'>
                                                    <button className='delete' type='button' onClick={() => {remove(val.id)}} style={{border: 'none', background: 'none'}}>Delete</button>
                                                </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='shippingDetails' style={{background: '#F9F9F9'}}>
                            <h4>Shipping Details</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="fullName" placeholder="Enter Name" required
                                    onChange={(e) => {setFullName(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="alamat" placeholder="EnterAddress" required
                                    onChange={(e) => {setAlamat(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Telephone number</Form.Label>
                                <Form.Control type="text" name='noHp' placeholder="Telephone Number" required
                                    onChange={(e) => {setNoHp(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Courier (COD)</Form.Label>
                                <Row>
                                    <Col md={6}>
                                        <Button className='CartPage__btnCourier' name='jnt' onClick={(e) => {setCourier("jnt")}}>
                                            <img src={Jnt} alt='jnt'/>
                                        </Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button className='CartPage__btnCourier' name='jne' onClick={(e) => {setCourier("jne")}}>
                                            <img src={Jne} alt='jne'/>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Button type="submit" className='CartPage__btnShipping' onClick={checkout}>
                                Checkout Now
                            </Button>
                        </Form>
                        </div>
                    </Col>
                </Row>
            </div>
           
        </div>
    </div>
  )
}
