import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const IfcTreeItem = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const nodeInfo = {       
    ExpressID:node?.expressID,
    name:node?.type,
    // ObjectType:node.ObjectType.value,
    // Tag:node.Tag.value,
  }

  const toggleOpen = () => {
    console.log(node)
    setIsOpen(!isOpen)
  };

  return (
    <div>
      {/* <h1>{"-".repeat(level || 0)}{nodeInfo.name},{nodeInfo.ExpressID}</h1>  
      {
        node.children && node.children.length ? 
          node.children.map((child) => {
            return <IfcTreeItem  key={child.expressID} node={child} level={(level || 0) + 1} />
          })
          : null
      } */}

      

<List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: 1 * level}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={toggleOpen}>
        <ListItemText primary={nodeInfo.name} />
        {node.children && node.children.length ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>
      {
        node.children && node.children.length ? 
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" >
          {node.children.map((child) => {
            return <IfcTreeItem  key={child.expressID} node={child} level={(level || 0) + 1} />
          })}
        </List>
      </Collapse>
          : null
      }
    </List>
    </div>
  );
};

export default IfcTreeItem;
