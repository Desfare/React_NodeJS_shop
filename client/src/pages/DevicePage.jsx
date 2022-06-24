import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {
    let [device, setDevice] = useState({info: []})
    
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={320} height={320} src={process.env.REACT_APP_API_URL_HOST + device.img}/>
                </Col>
                <Col md={4}>
                    <div className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`, 
                                width: 286,
                                height: 272, 
                                backgroundSize: 'cover',
                                fontSize: 64,
                            }}
                        >
                            {device.rating}
                        </div>
                    </div>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 320, height: 320, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price + "$"}</h3>
                        <Button variant={"outline-dark"}>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Specification</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : "transparent", padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;