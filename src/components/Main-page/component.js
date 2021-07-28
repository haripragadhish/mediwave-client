import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

import './styles.scss';
import Modal from 'react-modal';
import { Row,Col } from 'antd';
import axios from 'axios';
import { Card, Avatar, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;


function Main_page() {
    useEffect(() => {
        getAllCribs();
    }, []);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [crib, setCrib] = useState()
    const [Cribs, getCribs] = useState([]);
    const [search,setSearch] = useState('')



    const submit = (event) => {
        event.preventDefault();
        console.log(crib);
        axios.post('http://localhost:3000/cribs', crib)
            .then(function (response) {
                console.log(response);
                alert("Crib added sucessfully");
                getAllCribs();
            })
    }

    const getAllCribs = async () => {
        await axios.get("http://localhost:3000/cribs").then((response) => {
            const allCribs = response.data;
            getCribs(allCribs);
        }).catch(err => console.log(err))
    }

    const editCrib = async (id, name, img, location) => {
        await setModalIsOpen(true);
        setCrib({ name: name, img: img, location: location })
        // await axios.put("http://localhost:3000/cribs").then((response) => {
        //     const allCribs = response.data;
        //     getCribs(allCribs);
        // }).catch(err => console.log(err))
    }

    const deleteCrib = async (id) => {
        console.log(id);
        await axios.delete("http://localhost:3000/cribs/" + id).then((response) => {
            if (response) {
                alert('Deleted');
                getAllCribs();
            }
        }).catch(err => console.log(err))

    }

    
        const filterCribs =  Cribs.filter(cribs => {
            return cribs.name.toLowerCase().includes(search.toLowerCase())
        })
       
    

   

 

    

    return (
        <>
          
        <div className="title">
            <h3>Crib Hound</h3>
        </div>
                <div className="search-container">
                  
                        <div className="add-crib-icon" onClick={() => setModalIsOpen(true)}>
                            <AiIcons.AiOutlinePlus />

                        </div>
                   
                        <div className="searchbar">

                            
                            <span className="search-input"><Input style={{color:"whitesmoke"}} placeholder="Search using name" onChange={e =>setSearch(e.target.value)} bordered={false} /></span>



                        </div>
                    
                </div>




            <br />
            <Row>
                <div className="list-container" scroll="true">
                    {filterCribs.map((item, index) => {
                        return (
                            <div className="cards" key={index}>
                                <Card 
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={item.img}
                                        />
                                    }
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => editCrib(item._id, item.name, item.img, item.location)} />,
                                        <DeleteOutlined key="delete" onClick={() => deleteCrib(item._id)} />,
                                    ]}
                                >
                                    <Meta
                                        title={item.name}
                                        description={item.location}
                                    />
                                </Card>
                            </div>






                        )
                    })}
                </div>
            </Row>



            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
                style={
                    {
                        overlay: {
                            backgroundColor: "grey"
                        },
                        content: {
                            color: "orange"
                        }
                    }

                }
                ariaHideApp={false}>
                {console.log(crib)}
                <div className="form-data">
                    <form onSubmit={submit}>
                        <input type="text" placeholder="Name" name="name" onChange={e => setCrib({ ...crib, name: e.target.value })} /> <br /><br />
                        <input type="text" placeholder="Location" name="location" onChange={e => setCrib({ ...crib, location: e.target.value })} /> <br /><br />
                        <input type="text" placeholder="Enter Image URL" name="img" onChange={e => setCrib({ ...crib, img: e.target.value })} /> <br /><br />
                        <input type="submit" />
                        <button type="submit" onClick={() => setModalIsOpen(false)}>Close</button>
                    </form>
                </div>

            </Modal>

        </>
    )
}

export default Main_page
