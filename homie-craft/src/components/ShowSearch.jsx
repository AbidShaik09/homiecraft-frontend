import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowSearch = ({ suggestions, onSelect }) => {
    const navigate = useNavigate();

  const handleSelect = (item) => {
    onSelect();
    navigate(`/item/${item.id}`);
  };
  return (
    <Paper style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
      {suggestions.length > 0 ?
      <List>
        {suggestions.map((item) => (
          <ListItem type="button" button key={item.id} onClick={() => handleSelect(item)}>
            <ListItemText primary={item.name} secondary={`Price: ${item.price}, Material: ${item.material}`} />
          </ListItem>
        ))}
      </List>:<List>
        
          <ListItem key={1}>
            <Typography >No crafts found</Typography>
          </ListItem>
      </List>}
    </Paper>
  )
}

export default ShowSearch