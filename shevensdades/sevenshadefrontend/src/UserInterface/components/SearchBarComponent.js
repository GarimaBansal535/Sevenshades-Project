import SearchIcon from '@mui/icons-material/Search';

export default function SearchBarComponent(props){
    return(<div style={{ background: "#fff",
    borderRadius:15,
    width:'40%',
    height:33,
    marginLeft:'60',
    display:'flex',
    alignItems:"center",
    justifyContent:'center',
    marginLeft:100
    }}>
      
       
    <input type="text"    placeholder='Search Product & Brand......' style={{WebkitAppearance: "none",
    background: "#fff",
    border: "0",
    borderRadius:15,
    outline:'none',
    // border:'none',
    color: "#000",
    fontSize: "1rem",
    display:'flex',
    marginLeft:20,
    width:'90%',
 

   
    }}/>
    <SearchIcon style={{ display:'flex',marginTop:6,marginRight:10,color:"#000"}}/>
        </div>)
}