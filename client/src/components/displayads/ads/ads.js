import React, {Component} from 'react'
import Card from './card/card'
import './ads.css'
import Axios from 'axios'

export default class ads extends Component {

render(){
    

    const cards = this.props.posts.map( post => (
        <Card key={post._id} postid={post._id} price={post.price} title={post.title} picture={post.pictures[0]}/> 
    ))

    return (
        <div className="container justify-content-center" style={{height:'500px', overflow:"auto"}}>
            <div className="row justify-content-center">
            {cards}
            </div>
        </div>
    )
}
}

