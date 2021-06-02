import React from 'react'
import {Line} from 'react-chartjs-2'

function chart(props) {

    // const areaData = [
    //     {name: "DHA Karachi", prices:[4,4,5,6,7]},
    // {name:"Lyari", prices:[0.6,0.8,1,1,2]},
    // {name:"Kurangi", prices:[2,2,3,2,4]},
    // {name:"Shah Faisal", prices:[4,6,5,6,7]},
    // {name:"Bin Qasim Town", prices:[2,3,3,3,3]},
    // {name:"DHA Lahore", prices:[7,8,9,10,12]},
    // {name:"Gulshan Iqbal", prices:[3,3,5,5,6]},
    // {name:"Model Town", prices:[5,6,8,10,10]},
    // {name:"Allama Iqbal town", prices:[4,4,5,6,7]},
    //     {name:"Bin Qasim Town", prices:[4,4,5,6,7]},
    //     {name:"DHA Islamabad", prices:[4,5,6,8,9]},
    //     {name:"Bahria Town Rawalpindi", prices:[4,4,5,6,7]},
    //     {name:"Saddar", prices:[9,10,11,11,12]},
    //     {name:"Satellite Town", prices:[7,8,8,9,9]},
    //     {name:"Bani", prices:[7,8,9,10,12]},
    //     {name:"G15/F15", prices:[4,4,5,6,7]},
    //     {name:"Sector I", prices:[9,10,11,13,12]},
    //     {name:"Blue Area", prices:[13,15,17,20,20]},
    //     {name:"Sector H", prices:[15,16,20,23,23]},
    //     {name:"Bani Gala", prices:[9,10,11,12,12]},
    //     {name:"Wapda City", prices:[4,4,5,6,7]},
    //     {name:"Madinabad", prices:[8,9,9,11,10]},
    //     {name:"University Town", prices:[4,4,5,6,7]},
    //     {name:"Zaryab Colony", prices:[4,4,5,6,7]},
    // ]

    // let current = areaData.map(area=> {
    //     if(area.name==props.area){return area.prices}
    // })
    
    const data= {
        labels: ['2016','2017','2018','2019','2020'],
        datasets: [
            {
                label: "Prices (lac) per marla",
                data: props.area,
                tension: 0.5,
                borderColor: ['rgba(46,204,113,0.8)'],
                backgroundColor: ['rgba(46,204,113,0.8)'],
                pointBackgroundColor:['rgba(46,204,113,0.8)'],
                pointBorderColor:['rgba(46,204,113,0.8)']
            }
        ]
    }
    
    return <Line data={data}/>
}

export default chart
