import React ,{Component} from 'react';
import {useState, useCallback} from 'react';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import ReactMapGL from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder';
import { Container, Col, Row } from 'reactstrap';



import Pin from './pin';
const params = {
  country: "pk"
}

const TOKEN = 'pk.eyJ1Ijoic2hhcmplZWwxNDciLCJhIjoiY2tscDEzc3hkMG9odTJwcW1qNWprYmRpcSJ9.MizejsxjX0IQfEqBlBO9mg'; // Set your mapbox token here

const mapStyle = {
  width: '100%',
  height: 400,
}

export default function Mapp() {


    const [viewport,setViewport]=useState({
      width:'100vw',
      height:'100vh',
      latitude:33.5651,
      longitude:73.0169,
      zoom:12
    })

    const [lat,setlat]=useState(
      33.5651
    )

    const [long,setlong]=useState(
      73.0169
    )

  const setboth=(e)=>{
    console.log(e)
    setlong(e.lngLat[0])
    setlat(e.lngLat[1])

  }
  
  
  const onSelected = (viewport) => {
      setViewport(viewport)
  }

  
  return(
    <>

    

    <Row className="py-4">
      <Col >
        <Geocoder
          mapboxApiAccessToken={TOKEN}
          onSelected={onSelected}
          viewport={viewport}
          hideOnSelect={true}
          value=""
          queryParams={params}
                    
        />
      </Col>
    </Row>

    <Row>
      <Col>
        <ReactMapGL
        {...viewport}
        {...mapStyle}
        onViewportChange={(viewport=>{setViewport(viewport)})}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN} 
        onClick={setboth}
        
        >

        <Marker
          
          latitude={lat}
          longitude={long}>
        
          

        </Marker>
        <NavigationControl/>

       </ReactMapGL>
      
      </Col>
    </Row>
    
   
    </>
  )

}