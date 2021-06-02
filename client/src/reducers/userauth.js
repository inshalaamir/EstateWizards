
const initstate={
    user_id:null,
    name:null,
    location:null,
    token:null,
    islogged:false,
    admin: false
   
}

const authreducer=(state=initstate,action)=>{
    switch (action.type){
        
        case "admin":
            return{
                user_id:null,
                name:null,
                location:null,
                token:null,
                islogged:false,
                admin:true
                
            }
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
                islogged:true,
                admin:false
               
            }
        case "logout":
            return{
                user_id:null,
                name:null,
                location:null,
                token:null,
                islogged:false,
                admin:false
                
            }
        default:
            return state
            
    }


}

export default authreducer;