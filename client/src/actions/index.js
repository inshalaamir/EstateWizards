
export const signedin=(data)=>{
    return{
        type:"signin",
        payload:data

    }

}

export const loggedout=()=>{
    return{
        type:"logout"
    }
}

export const forAdmin=()=>{
    return{
        type:"admin"
    }
}








