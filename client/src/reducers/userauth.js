
const initstate={
    user_id:null,
    name:null,
    location:null,
    token:null,
    islogged:false
}

const authreducer=(state=initstate,action)=>{
    switch (action.type){
        
        case 'signin':
            console.log(action.payload.id)
            console.log(action.payload.name)
            console.log(action.payload.location)
            console.log(action.payload.token)
            
            return{
                user_id:action.payload.id,
                name:action.payload.name,
                location:action.payload.location,
                token:action.payload.token,
                islogged:true
            }
        case "logout":
            return{
                user_id:null,
                name:null,
                location:null,
                token:null,
                islogged:false
            }
        default:
            return state
            
    }


}

export default authreducer;