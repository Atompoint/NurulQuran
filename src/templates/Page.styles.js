import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    rootStyle : {
        padding: "0rem 5rem",
        
    },
    categoryBox:{
            background: "#f8f8f8",
            boxShadow: "2px 2px 6px 1px rgba(0, 0, 0, 0.2)",
            height: "290px",
            borderRadius: "10px",
           
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        flexFlow:"column"
          
    },
    

   }));