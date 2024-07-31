import * as React from 'react';

import { FormControl,Select,MenuItem,InputLabel } from '@mui/material';
import { useState,useEffect } from 'react';
import { getData } from '../../services/FetchDjangoApiService';

export default function ShowAllDropDown(props){
    const [subCategoryList, setSubCategoryList] = useState([])
    const [brandList, setBrandList] = useState([])
   
    useEffect(function() 
    {
      handleFetchSubCategory();
    }, []);
  
    const handleFetchSubCategory=async()=> 
    {
      var result = await getData('user_subcategory_list');
      setSubCategoryList(result.data);
      
    }

    const fillSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return <MenuItem value={item.id}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleFetchBrand=async()=> 
    {
      var result = await getData('all_brand_list');
      setBrandList(result.data);
      
    }

    const fillBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.id}>{item.brandname}</MenuItem>
        })
    }




    return(<div style={{background:'#ddd',width:'100%',height:'auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
           <div style={{marginLeft:100,width:80}}>
            <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>Category</InputLabel>
                    <Select value={subCategoryList}
                           label='Category'
                           onChange={handleFetchSubCategory}
                           >
                        <MenuItem value='Select Category'>Select Category</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    
                </FormControl>
                </div>


                <div style={{marginLeft:100,width:80}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>brand</InputLabel>
                    <Select value={brandList}
                           label='brand'
                           onChange={handleFetchBrand}
                           >
                        <MenuItem value='Select brand'>Select brand</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>
                 </div>
 
                 <div style={{marginLeft:100,width:80}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>brand</InputLabel>
                    <Select value={brandList}
                           label='brand'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select brand'>Select brand</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>
                 </div>



                 <div style={{marginLeft:100,width:80}}>
                 <FormControl variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>Size</InputLabel>
                    <Select value={brandList}
                           label='Size'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select size'>Select size</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>
                 </div>
                 
                 <div style={{marginLeft:100,width:80}}>
                 <FormControl variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>Colour</InputLabel>
                    <Select value={brandList}
                           label='Colour'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select colour'>Select colour</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>  
            </div>

            <div style={{marginLeft:100,width:90}}>
                 <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>Sort</InputLabel>
                    <Select value={brandList}
                           label='sort'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select sort'>Select Sort</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>  
            </div>
            <div style={{marginLeft:100,width:80}}>
                 <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>PriceRange</InputLabel>
                    <Select value={brandList}
                           label='Price range'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select Price'>Select Price</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>  
            </div>

            <div style={{marginLeft:100,width:80}}>
                 <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120} }>
                    <InputLabel style={{letterSpacing:1.5,fontSize:14,fontFamily:'Josefin+Sans',alignContent:'center'}}>Discount %</InputLabel>
                    <Select value={brandList}
                           label='Discount'
                        //    onChange={handleFetchbrand}
                           >
                        <MenuItem value='Select discount'>Select Discount</MenuItem>
                        {fillBrand()}
                    </Select>
                 </FormControl>  
            </div>

    </div>)
}