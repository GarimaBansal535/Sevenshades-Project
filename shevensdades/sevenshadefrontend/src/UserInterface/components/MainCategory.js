import { Button } from "@mui/material"
import { serverURL } from "../../services/FetchDjangoApiService"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Pageview } from "@mui/icons-material"

export default function MainCategory(props){
    const [mouse,setMouse]=useState("")
    var nevigate=useNavigate()

    var items=props.data
    const handleclick=(item)=>{
        nevigate('/secondpage',{state:{products:item,pageview:'MainCategory'}})

  }


    const ShowAllItems=()=>{
        return items.map((item,index)=>{
            return(<div style={{display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
                    <img src={`${serverURL}${item.icon}`} loading="lazy" 
                              style={{marginRight:'70px'}}/>
                
                    <div  style={{fontWeight:"bold",
                                  fontSize:27,
                                  letterSpacing:1.5,
                                  marginTop:'15px',
                                  fontWeight:750}}>{`Tranding Fasion for:${item.maincategoryname}`}</div>
                    
                    <Button  onClick={()=>handleclick(item)} style={{marginTop:'20px',width:180,height:60,borderWidth:2.5,borderColor:'black',borderStyle: 'solid',background:mouse==index?'black':'#ffff'}}
                    variant="outlined" onMouseLeave={()=>setMouse("")} onMouseOver={()=>setMouse(index)} >
                        <div style={{fontWeight:"bold",fontSize:15,letterSpacing:1.5,fontWeight:700,color:index==mouse?"#ffff":'black'}}>Shop now </div>
                        </Button>
            </div>)
        })
    }
    return(<div style={{display:'flex',flexWrap:"wrap",justifyContent:"center",alignItems:'center'}}>

            {ShowAllItems()}
    </div>)
}