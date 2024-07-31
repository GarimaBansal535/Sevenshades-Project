import logoimage from "../../../images/logo.png"
import { useNavigate } from "react-router-dom"

export default function TitleComponent(props)
{
  var navigate=useNavigate()
    return(<div style={{display:'flex',width:"100%", justifyContent:"space-evenly"}}>
       <div style={{display:'flex',width:230,alignItems:'center',justifyContent:'space-between'}}>
         <img src={logoimage}  style={{width:40,height:40}}/>
         <div style={{fontSize:22,fontWeight:'bold'}}>{props.title}</div>
        </div>
        {props.listicon?
         <img src={props.listicon}  onClick={()=>navigate(props.link)}  style={{marginLeft:'auto',width:35,height:35}}/>:<></>}
    </div>)
}