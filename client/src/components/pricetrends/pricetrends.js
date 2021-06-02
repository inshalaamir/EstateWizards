import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'
import LineChart from "./chart"
import './pricetrends.css'

export class pricetrends extends Component {

    state={
        city: "Karachi",
        area: "DHA Karachi",
        current: [4,4,5,6,7]
    }

    handleChange = (e) => {

        const areaData = [
            {name: "DHA Karachi", prices:[4,4,5,6,7]},
        {name:"Lyari", prices:[0.6,0.8,1,1,2]},
        {name:"Kurangi", prices:[2,2,3,2,4]},
        {name:"Shah Faisal", prices:[4,6,5,6,7]},
        {name:"Bin Qasim Town", prices:[2,3,3,3,3]},
        {name:"DHA Lahore", prices:[7,8,9,10,12]},
        {name:"Gulshan Iqbal", prices:[3,3,5,5,6]},
        {name:"Model Town", prices:[5,6,8,10,10]},
        {name:"Allama Iqbal town", prices:[4,4,5,6,7]},
            {name:"Bin Qasim Town", prices:[4,4,5,6,7]},
            {name:"DHA Islamabad", prices:[4,5,6,8,9]},
            {name:"Bahria Town Rawalpindi", prices:[4,4,5,6,7]},
            {name:"Saddar", prices:[9,10,11,11,12]},
            {name:"Satellite Town", prices:[7,8,8,9,9]},
            {name:"Bani", prices:[7,8,9,10,12]},
            {name:"G15/F15", prices:[4,4,5,6,7]},
            {name:"Sector I", prices:[9,10,11,13,12]},
            {name:"Blue Area", prices:[13,15,17,20,20]},
            {name:"Sector H", prices:[15,16,20,23,23]},
            {name:"Bani Gala", prices:[9,10,11,12,12]},
            {name:"Wapda City", prices:[4,4,5,6,7]},
            {name:"Madinabad", prices:[8,9,9,11,10]},
            {name:"University Town", prices:[4,4,5,6,7]},
            {name:"Zaryab Colony", prices:[4,4,5,6,7]},
        ]

        var current = [1,2,3,4,5] 

        for (var i=0; i<areaData.length; i++){
            if (areaData[i].name==e.target.value){current=areaData[i].prices}
        }

        this.setState({[e.target.name]: e.target.value, current: current})
    }


    handleChangeCity = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }




    render() {

        const areaData = [
            {name: "DHA Karachi", prices:[4,4,5,6,7]},
        {name:"Lyari", prices:[0.6,0.8,1,1,2]},
        {name:"Kurangi", prices:[2,2,3,2,4]},
        {name:"Shah Faisal", prices:[4,6,5,6,7]},
        {name:"Bin Qasim Town", prices:[2,3,3,3,3]},
        {name:"DHA Lahore", prices:[7,8,9,10,12]},
        {name:"Gulshan Iqbal", prices:[3,3,5,5,6]},
        {name:"Model Town", prices:[5,6,8,10,10]},
        {name:"Allama Iqbal town", prices:[4,4,5,6,7]},
            {name:"Bin Qasim Town", prices:[4,4,5,6,7]},
            {name:"DHA Islamabad", prices:[4,5,6,8,9]},
            {name:"Bahria Town Rawalpindi", prices:[4,4,5,6,7]},
            {name:"Saddar", prices:[9,10,11,11,12]},
            {name:"Satellite Town", prices:[7,8,8,9,9]},
            {name:"Bani", prices:[7,8,9,10,12]},
            {name:"G15/F15", prices:[4,4,5,6,7]},
            {name:"Sector I", prices:[9,10,11,13,12]},
            {name:"Blue Area", prices:[13,15,17,20,20]},
            {name:"Sector H", prices:[15,16,20,23,23]},
            {name:"Bani Gala", prices:[9,10,11,12,12]},
            {name:"Wapda City", prices:[4,4,5,6,7]},
            {name:"Madinabad", prices:[8,9,9,11,10]},
            {name:"University Town", prices:[4,4,5,6,7]},
            {name:"Zaryab Colony", prices:[4,4,5,6,7]},
        ]
    
        let current = areaData.map(area=> {
            if(this.state.area==area.name){return area.prices}
        })
        
        return (
            <div className="priceTrends">

                <div className="priceTrends__bar">
                    <select name="city" value={this.state.city} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChangeCity}>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Lahore">Lahore</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value ="Rawalpindi">Rawalpindi</option>
                            <option value="Faisalabad">Faisalabad</option>
                    </select>
                    {this.state.city=="Karachi"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="DHA Karachi">DHA Karachi</option>
                            <option value="Lyari">Lyari</option>
                            <option value="Kurangi">Kurangi</option>
                            <option value="Shah Faisal">Shah Faisal</option>
                            <option value ="Bin Qasim Town">Bin Qasim Town</option>
    
                    </select>:""
                    
                    }
                    {this.state.city=="Lahore"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="DHA Lahore">DHA Lahore</option>
                            <option value="Gulshan Iqbal">Gulshan Iqbal</option>
                            <option value="Model Town">Model Town</option>
                            <option value="Allama Iqbal town">Allama Iqbal town</option>
                            <option value ="Bin Qasim Town">Bin Qasim Town</option>
    
                    </select>:""
                    
                    }
                    {this.state.city=="Rawalpindi"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="DHA Islamabad">DHA Islamabad</option>
                            <option value="Bahria Town Rawalpindi">Bahria Town Rawalpindi</option>
                            <option value="Saddar">Saddar</option>
                            <option value="Satellite Town">Satellite Town</option>
                            <option value ="Bani">Bani</option>
    
                    </select>:""
                    
                    }
                    {this.state.city=="Islamabad"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="G15/F15">G15/F15</option>
                            <option value="Sector I">Sector I</option>
                            <option value="Blue Area">Blue Area</option>
                            <option value="Sector H">Sector H</option>
                            <option value ="Bani Gala">Bani Gala</option>
    
                    </select>:""
                    
                    }
                    {this.state.city=="Faisalabad"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="Wapda City">Wapda City</option>
                            <option value="Madinabad">Madinabad</option>
                    </select>:""
                    
                    }
                    {this.state.city=="Peshawar"? 
                    
                    <select name="area" value={this.state.area} class="p-1 ml-1 col-md-3 form-control form-control-sm" onChange={this.handleChange}>
                            <option value="Cantonment">Cantonment</option>
                            <option value="University Town">University Town</option>
                            <option value="Zaryab Colony">Zaryab Colony</option>
                    </select>:""
                    
                    }
                </div>

                <div className="priceTrends__chart">
                    <LineChart city={this.state.city} area={this.state.current}/>
                </div>
            </div>
        )
    }
}

export default pricetrends
