var initialstate={
    product:{},
    user:{}

}
export default function RootReducer(state=initialstate,action){
  switch(action.type)
  {
    case "ADD_PRODUCT":
    state.product[action.payload[0]]=action.payload[1]
    return {product:state.product,user:state.user}

   
    case "DELETE_PRODUCT":
    delete state.product[action.payload[0]]
    return {product:state.product,user:state.user}

    case "ADD_USER":
    state.user[action.payload[0]]=action.payload[1]
    return {product:state.product,user:state.user}
    
    default:
        return {product:state.product,user:state.user}
    
  }
}