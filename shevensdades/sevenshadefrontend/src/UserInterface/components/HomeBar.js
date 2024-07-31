import Divider from '@mui/material/Divider';
import ProductComponent from './ProductComponent';
export default function HomeBar(props){
    // var mname =props.mname
    // var pname=props.pname
    return(<div>
         <div style={{height:40,letterSpacing:1.5,fontSize:11,fontFamily:'Josefin+Sans',alignContent:'center',marginLeft:'100px'}}>Home>{props.category}</div>
        <Divider/>
        <div style={{textAlign:"center",alignContent:'center',height:70,letterSpacing:1.8,fontWeight:700,fontSize:22,fontFamily:'Josefin+Sans'}}>New In:{props.category}</div>
    </div>)
}