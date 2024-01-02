import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/lab/Autocomplete';
import { TextField, Button } from '@mui/material';
import { SelectContractsProps, Part } from '../props/types';
import "../styles/Contract.css"

export default function SelectContracts(props: SelectContractsProps) {
  const { rows, setRows, handleIdChange, handleQuantityChange, handlePriceChange, parts, setParts } = props;
    useEffect(() => {
      // Fetch parts data from API
      fetch('http://localhost:3002/api/v1/part-information')
        .then(response => response.json())
        .then(data => setParts(data))
        .catch(error => console.error('Error fetching parts data:', error));
    }, []);


  const styleProductSelector = {
    marginRight : '10px',
    width: '55%'
  };

  const styleQuantity = {
    marginRight : '10px',
    width: '20%'
  };
  const addRow = () => {
    setRows([...rows, { id: 0, quantity: 0, price: 0 }]);
  };

  return (
    <div className='AddParts'> 
      {rows.map((row, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{display : 'flex'}}>
            <Autocomplete
              options={parts}
              getOptionLabel={(option) => String(option.id)}
              style={styleProductSelector}
              value={parts.find(part => part.id === row.id)}
              onChange={(event, newValue) => handleIdChange(index, newValue)}
              renderInput={(params) => <TextField {...params} label="Produit" />}
            />

            <TextField
              label="Quantité"
              type="number"
              value={row.quantity}
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              style={styleQuantity}
            />
            <TextField
              label="Prix conseillé"
              type="number"
              value={row.price}
              onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
              style={{ marginRight: '10px' }}
            />
          </div>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={addRow}>
        +
      </Button>
    </div>
  );
};
