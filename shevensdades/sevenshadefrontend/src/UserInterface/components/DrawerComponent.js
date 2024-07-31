import { Drawer } from "@mui/material";
import { useState,useEffect } from "react";
import {List,ListItemButton,ListItemIcon,ListItemText} from "@mui/material"
import { serverURL,getData } from "../../services/FetchDjangoApiService";

export default function DrawerComponent(props){
    const[categoryList,setCategoryList]=useState([])
    
    useEffect(function(){
        fetchAllMainCategory()

        },[])

     
    const fetchAllMainCategory=async()=>{
      var result=await getData('user_maincategory_list')
      setCategoryList(result.data)
    } 
    const toggleDrawer = (newOpen) => () => {
        props.setOpen(newOpen);
    }

    const ShowContent=()=>{
        return categoryList?.map((item,i)=>{
            return(
                <ListItemButton>
                     <ListItemText primary={<div style={{fontSize:20,letterSpacing:1,textAlign:'start'}}>{item.maincategoryname}</div>}></ListItemText>
                    <ListItemIcon>
                    <div><img src={`${serverURL}${item.icon}`} style={{width:60,height:60,borderRadius:10}}/></div>
                    </ListItemIcon>
                   
                   
                </ListItemButton>
            
         
            )

        })
    }
    return(<div>
     <Drawer open={props.open}  onClose={toggleDrawer(false)}>
      <List style={{ width:200, bgcolor: 'background.paper'}}  component="nav">
      {ShowContent()}
       <ListItemButton>
         <ListItemText primary={<div style={{fontSize:20,letterSpacing:1,textAlign:'start'}}>Order</div>}></ListItemText>
                    <ListItemIcon>
                    <div><img src={`${serverURL}/static/order.webp`} style={{width:60,height:60,borderRadius:10}}/></div>
                    </ListItemIcon>
                   
        </ListItemButton>
        <ListItemButton>
         <ListItemText primary={<div style={{fontSize:20,letterSpacing:1,textAlign:'start'}}>Profile</div>}></ListItemText>
                    <ListItemIcon>
                    <div><img src={`${serverURL}/static/profile.jpg`} style={{width:60,height:60,borderRadius:10}}/></div>
                    </ListItemIcon>
                   
        </ListItemButton>
      </List>
     </Drawer>
    </div>)
}