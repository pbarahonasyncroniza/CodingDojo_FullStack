import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import  {Divider} from "@mui/material"


const OpenModal = ({ isOpen, handleClose, sectionData }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '80%', 
        left: '90%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4 
      }}>
        <Typography variant="h6" component="h2">
          IFC Properties
        </Typography>
        {sectionData && (
          <div>
           <Typography sx={{ fontSize:14, color:"blue", fontStyle:"italic"}} >Name: {sectionData.name}</Typography>
                    <Divider />
                    <Typography sx={{ fontSize:14}}>IFC Category: {sectionData.IfcCategory}</Typography>
                    <Divider />
                    <Typography sx={{ fontSize:14}}>ExpressId: {sectionData.ExpressID}</Typography>
                    <Divider />
                    <Typography sx={{ fontSize:14}}>ObjectType: {sectionData.ObjectType}</Typography>
                    <Divider />
                    <Typography sx={{ fontSize:14}}>Tag: {sectionData.Tag}</Typography>
            
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default OpenModal;
