import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/lab/Autocomplete';
import { TextField, Button } from '@mui/material';

type Part = {
  id: number;
  defaultPrice: number;
};

type RowData = {
  id: number;
  quantity: number;
  price: number;
};

export default function SelectContracts() {
  const [parts, setParts] = useState<Part[]>([]);
  const [rows, setRows] = useState<RowData[]>([{ id: 0, quantity: 0, price: 0 }]);

  useEffect(() => {
    // Fetch parts data from API
    fetch('http://localhost:3002/api/v1/part-information')
      .then(response => response.json())
      .then(data => setParts(data))
      .catch(error => console.error('Error fetching parts data:', error));
  }, []);

  const handleIdChange = (index: number, newPart: Part | null) => {
    const newRows = [...rows];
    const selectedPart = parts.find(part => part.id === newPart?.id);
    newRows[index].id = newPart?.id || 0;
    newRows[index].price = selectedPart?.defaultPrice || 0;

    setRows(newRows);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const newRows = [...rows];
    newRows[index].quantity = value;
    setRows(newRows);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRows = [...rows];
    newRows[index].price = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { id: 0, quantity: 0, price: 0 }]);
  };

  const styleProductSelector = {
    marginRight : '10px',
    width: '55%'
  };

  const styleQuantity = {
    marginRight : '10px',
    width: '20%'
  };

  return (
    <div> 
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
        Nouvelle ligne
      </Button>
    </div>
  );
};
