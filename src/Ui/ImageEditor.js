import React,{useState} from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


const useStyle=makeStyles(theme=>({
Icon:{
  position:"relative",
  top:"28%",
  width:"1.5em",

  height:"1.5em ",
},
customFileUpload :{
   background: "white",
  border:"1px solid white",
  width:"100px",
  height:"100px",
  borderRadius:15,
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
   boxShadow:theme.shadows[10],
},
fileUpload:{
	display:"none"
},
imgPreview:{
	height:'20em',
	width:'20em',
	borderRadius:15,
	marginTop:'5em',
	[theme.breakpoints.down('md')]:{
		height:'15em',
	width:'15em',
	
	marginTop:'3em',
	},
	[theme.breakpoints.down('xs')]:{
		height:'8em',
	width:'8em',
	
	marginTop:'2em',
	},
	
	
}


}))


export default function ImageEditor(props){

const classes=useStyle();
const [myfile,setFile]=useState([]);
const [myblobfile,setblobFile]=useState(0);

	

  const getBase64=(file)=> {
   var reader = new FileReader();
   reader.readAsDataURL(file);
    
   
   reader.onload = function () {
   	var tempArr = myfile;
   	
     const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');


                tempArr.push(base64String);
                setFile(tempArr);
       			console.log(myfile);
     
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };

  
}

const handleChange=(event) =>{
     
    
  if(event.target.files[0]){
    console.log(event.target.files[0])
   //tempArr.push(URL.createObjectURL(event.target.files[0]));
    setblobFile(URL.createObjectURL(event.target.files[0]));
    console.log(myblobfile)
       getBase64(event.target.files[0]);
     } 	

    //RES.images=this.state.myfile;

  }

return (

		<div>
     		 <Typography variant='h5'>Upload Images</Typography>
      			<label htmlFor="file-upload" className={classes.customFileUpload} >
   				<AddCircleIcon className={classes.Icon} />
				</label>
				<input id="file-upload" type="file" className={classes.fileUpload} onChange={handleChange}/>

				<Grid container style={{display:myblobfile===[]?"none":"block"}}>
					<Grid container item direction='column' alignItems='center'>
						<Grid item >
							<img className={classes.imgPreview} src={myblobfile}/>
						</Grid>
						<Grid container item direction="row" justify='center' spacing={2}>
							<Grid item>
								<Button variant='outlined' size='medium' >X</Button>
							</Grid>
							<Grid item>
								<Button variant='outlined' size='medium' >Edit</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
        </div>

	)


}