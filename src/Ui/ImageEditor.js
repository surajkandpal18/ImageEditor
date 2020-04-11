import React,{useState} from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CropIcon from '@material-ui/icons/Crop';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RestoreIcon from '@material-ui/icons/Restore';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';


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
	
	
},

imagetoBeEdited:{
  height:'40em',
  width:'30em',
 
  marginTop:'3em',
 
  [theme.breakpoints.down('xs')]:{
    height:'30em',
  width:'20em',
  
  marginTop:'2em',
  },
  
},

imagePopupContainer:{
  width:"100vw",
  height:"100vh",
  
},
menuItems:{
  backgroundColor:"black",
  width:"100%"
},
saveCloseButton:{
  backgroundColor:"black"
},

myButtons:{
  backgroundColor:'orange',
  color:'white',
  marginTop:'1em',
},
brightnessSlider:{
 width:'10em'
},

brightnessSliderContainer:{
  display:"none",
}


}))

const EditorPopup=(props)=>{
  const classes=useStyle();
const theme=useTheme();
const [value, setValue] = React.useState(0);

const matchesXS=useMediaQuery(theme.breakpoints.down('sm'));

    const handleBrightness=(event)=>{
  //  event.target.closest('button').parentElement.parentElement.previousSibling.childNodes[0].style.filter=`brightness(${value})`
console.log(document.getElementById("brightnessSliderContainer").style.display)
  if(document.getElementById("brightnessSliderContainer").style.display===''||document.getElementById("brightnessSliderContainer").style.display==='none')
    {document.getElementById("brightnessSliderContainer").style.display='block'}
  else{
      document.getElementById("brightnessSliderContainer").style.display='none'
    }
  }

  const handleEditPopupClose=(event)=>{
     document.getElementsByClassName("imgPopupContainer")[0].style.display="none"
  }


  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    document.getElementById("imagetoBeEdited").style.filter=`brightness(${value}%)`
  };

  const valuetext=(value)=> {
  return `${value}%`;
}

const brightnessSlider=(
        <Grid className={classes.brightnessSliderContainer} id="brightnessSliderContainer" item xs>

          <Slider
          
          className={classes.brightnessSlider}
            value={typeof value === 'number' ? value : 0}
             getAriaValueText={valuetext}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            step={10}
            max={150}
          />

        </Grid>
  )

return (
    <Grid container direction="column" justify="center" className="imgPopupContainer" style={{display:"none",top:0,backgroundColor:'black',position:'absolute',zIndex:3,width:"100%",height:"100%"}}>
    <Grid item >
          <img className={classes.imagetoBeEdited} id='imagetoBeEdited' src={props.myblobfile} alt="imagetobeedited" />
          
    </Grid>
    
         
          {brightnessSlider}
    
    <Grid item container direction="row" justify="center" spacing={matchesXS?1:2} className={classes.menuItems} >
      <Grid item> <Button className={classes.myButtons} size={matchesXS?"small":'medium'} variant="contained"><RestoreIcon/></Button></Grid>
      <Grid item><Button className={classes.myButtons} size={matchesXS?"small":'medium'} variant="contained"><RotateLeftIcon/></Button></Grid>
     <Grid item> <Button className={classes.myButtons} size={matchesXS?"small":'medium'} variant="contained"><RotateRightIcon/></Button></Grid>
      <Grid item><Button className={classes.myButtons} size={matchesXS?"small":'medium'} variant="contained"><CropIcon/></Button></Grid>
     <Grid item> <Button className={classes.myButtons} size={matchesXS?"small":'medium'} variant="contained" onClick={handleBrightness}><Brightness5Icon/></Button></Grid>
    </Grid>
    <Grid item container direction="row" spacing={3} justify="center" className={classes.saveCloseButton} >
      <Grid item>
          <Button className={classes.myButtons} variant='contained'>Save</Button>
      </Grid>
      <Grid item>
          <Button className={classes.myButtons} variant='contained' onClick={handleEditPopupClose}>Close</Button>
      </Grid>
    </Grid>
    </Grid>



  )

}


export default function ImageEditor(props){

const classes=useStyle();
const [myfile,setFile]=useState([]);
const theme=useTheme();
const [myblobfile,setblobFile]=useState(0);
const matchesXS=useMediaQuery(theme.breakpoints.down('xs'));


	

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

  const handleEditPopup=(event)=>{

    document.getElementsByClassName("imgPopupContainer")[0].style.display="block"
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
						<Grid container item direction="row" justify='center' spacing={matchesXS?1:2}>
							<Grid item>
								<Button variant='outlined' size={matchesXS?"small":'medium'} >X</Button>
							</Grid>
							<Grid item>
								<Button variant='outlined' size={matchesXS?"small":'medium'} onClick={handleEditPopup}>Edit</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
        <EditorPopup myblobfile={myblobfile}/>
        </div>

	)


}