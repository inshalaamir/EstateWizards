import React, {Component} from 'react'
import Card from './card/card'
import '../../displayads/ads/ads.css'
import Axios from 'axios'
import "./hostings.css"

export default class hostings extends Component {

render(){
    

    const cards = this.props.posts.map( post => (
        <Card key={post._id} postid={post._id} price={post.price} title={post.title} picture={post.pictures[0]} dates={this.props.dates}/> 
    ))

    return (
        <div className="hostings container justify-content-center" style={{height:'100vh', overflow:"auto"}}>
            <div className="row justify-content-center">
            {cards}
            </div>
        </div>
    )
}
}

