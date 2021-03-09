import React, { Component} from 'react'
import ReactMapGL, { Marker, Popup ,NavigationControl} from "react-map-gl";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder';
import Pin from '../../sell/map/pin.js'
import home from './home2.png'
import Card from '../../displayads/ads/card/card.js'

const TOKEN= 'pk.eyJ1Ijoic2hhcmplZWwxNDciLCJhIjoiY2tscDEzc3hkMG9odTJwcW1qNWprYmRpcSJ9.MizejsxjX0IQfEqBlBO9mg'

const mapStyle = {
    width: '100%',
    height: 550,
}

const params = {
    country: "pk"
}


const navControlStyle= {
    right: 10,
    top: 10
}


export default class Map extends Component {
    constructor(props){
        super(props)
        this.state={
            vewport:{
                latitude: null,
                longitude: null,
                width: "100vw",
                height: "100vh",
                zoom:13
            },
            loc:null,
            selectedproperty:null,
            ads:this.props.posts
        }
    }

    

    componentDidMount(){
        this.setState({viewport:{
            latitude: this.props.loc[0],
            longitude: this.props.loc[1],
            width: "100vw",
            height: "100vh",
            zoom:13
            
            }
        }
        )
        this.setState({loc:this.props.loc})
    }

    
    componentDidUpdate(prevprops){

        if(prevprops.loc!=this.props.loc){
        
            this.setState({viewport:{
                latitude: this.props.loc[0],
                longitude: this.props.loc[1],
                width: "100vw",
                height: "100vh",
                zoom:13

            }})
            this.setState({loc:this.props.loc})
        }
        if(prevprops.posts!=this.props.posts){
            this.setState({
                ads:this.props.posts
            })
        }
    }

    
    mymap = React.createRef()
    onSelected = (viewport) => {
        this.setState({viewport:viewport})
    }
    render() {
        
        const selectedproperty=this.state.selectedproperty
        return (
            <div>
                

                <ReactMapGL
                    {...this.state.viewport}
                    {...mapStyle}
                    ref={this.mymap}
                    onViewportChange={(viewport=>{this.setState({viewport:viewport})})}
                    mapStyle="mapbox://styles/sharjeel147/cklzer9lo25y417o8sit2sll0"
                    mapboxApiAccessToken={TOKEN} 
        
                    
                >
                    <Geocoder 
                    mapboxApiAccessToken={TOKEN}
                    mapRef={this.mymap}
                    onViewportChange={(viewport=>{this.setState({viewport:viewport})})}
                    position='top-left'
                    params={params}

                                  
                />
                    {this.state.ads.map(ad => (
                    <Marker
                        key={ad._id}
                        latitude={ad.latlong[0]}
                        longitude={ad.latlong[1]}
                    >
                        <button
                        style={{background: 'none',border: 'none',cursor: 'pointer',}}
                        onClick={e => {
                            e.preventDefault();
                            this.setState({selectedproperty:ad});
                        }}
                        >
                        
                        <img src={home} alt='ok' style={{height:'40px',width:'40px'}}></img>
                        
                        </button>
                    </Marker>
                    ))}

                    {selectedproperty ? (
                     
                    <Popup
                        latitude={selectedproperty.latlong[0]}
                        longitude={selectedproperty.latlong[1]}
                        onClose={() => {
                        this.setState({selectedproperty:null})}}
                    >
                        <Card key={selectedproperty._id} postid={selectedproperty._id} price={selectedproperty.price} title={selectedproperty.title} picture={selectedproperty.pictures[0]}/> 
                    </Popup>
                    
                    ) : null}

                <NavigationControl style={navControlStyle}/>

                </ReactMapGL>


            </div>
        )
    }
}


