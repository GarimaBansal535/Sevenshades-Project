import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      backgroundColor: '#ecf0f1',
     justifyContent:'center',
    //  alignItems:'center',
     width:'100%',
     height:'100vh'
    },
    box:{
        width:'40%',
        height:'40%',
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:"14%",
        padding:10

    },
    
    display_root: {
      display: 'flex',
      backgroundColor: '#ecf0f1',
     justifyContent:'center',
     alignItems:'center',
     width:'100%',
     height:'100vh'
    },
    display_box:{
        width:'50%',
        height:'auto',
        backgroundColor:'#fff',
        borderRadius:15,
        padding:10

    }
  }));
  