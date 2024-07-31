import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      backgroundColor: '#ecf0f1',
     justifyContent:'center',
     alignItems:'center',
     width:'100%',
     height:'100vh'
    },
    box:{
        width:'60%',
        height:'81%',
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:'7%',
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
        width:'60%',
        height:'auto',
        marginTop:'7%',
        backgroundColor:'#fff',
        borderRadius:15,
        padding:10

    }
  }));
  