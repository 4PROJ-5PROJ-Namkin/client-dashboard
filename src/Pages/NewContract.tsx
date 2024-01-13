import React, { CSSProperties, useState } from 'react';
import SelectContracts from '../composants/selectContracts';
import axios from "axios";
import { RowData, Part } from '../props/types';
import {
    MDBBtn, 
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
}
from 'mdb-react-ui-kit';

export default function Contract() {
    const [rows, setRows] = useState<RowData[]>([{ id: 0, quantity: 1, price: 0 }]);
    const [parts, setParts] = useState<Part[]>([]);
    const [client_name, setName] = useState<string>('');
    const [contract_number, setCnumber] = useState<string>('');
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    const [date, setDate] = useState<Date>(curr);
    const [showFormError, setShowFormError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
      const updateParts = (updatedParts: Part[]) => {
        setParts(updatedParts);
    };
     
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#F7F7F7',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
        },
        title: {
            color: '#333',
            marginBottom: '10px'
        },
        classItem: {
            backgroundColor: '#FFF',
            padding: '10px',
            margin: '5px 0',
            borderRadius: '4px',
            boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
        },
        button: {
            backgroundColor: '#4CAF50',
            color: '#FFF',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '10px'
        },
        topbox : {
            display : "flex",
            columnGap : "20px",
        },
        bottombox : {
            display : "flex",
            columnGap : "20px"
        },
        classSubItem: {
            margin: '5px 0',
        },
    };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const onSubmit = async () => {
        setShowSuccess(false);
        setShowFormError(false);


        let i = 0;
        let j = 0;
        let cash: number[] = [];
        let partsTreated: number[] = [];
        
        while (i < rows.length) {
            for (j = 0; j < rows[i].quantity; j++) {
                cash.push(rows[i].price);
                partsTreated.push(rows[i].id);
            }
            i++;
        }
        try {
             await postContract(contract_number, client_name, partsTreated, cash, date);
             setShowSuccess(true);

             
        }catch (error) {
            setShowFormError(true);
        }
    };
    return (
        <MDBContainer fluid >
            <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Ajout d'un contrat</h2>
                            <div className='flexed'>
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Numéro de contrat' id='Nom' type='text' placeholder='2024-01-01A' onChange={(e) => setCnumber(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Nom du client' id='client' type='text' placeholder='John Doe' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <MDBInput wrapperClass='mb-4' label='Date' id='date' type='date' value={formattedDate} onChange={(e) => setDate(new Date(e.target.value))}  />
                            <SelectContracts
                                rows={rows}
                                setRows={setRows}
                                handleIdChange={handleIdChange}
                                handleQuantityChange={handleQuantityChange}
                                handlePriceChange={handlePriceChange}
                                parts={parts}
                                setParts={setParts}
                            />
                            {showFormError && (
                                <div className="alert alert-warning" role="alert">
                                    Impossible de créer le contrat
                                </div>
                            )}
                            {showSuccess && (
                                <div className="alert alert-success" role="alert">
                                    Contrat ajouté avec succès
                                </div>
                            )}
                            <button type="button"  className={"btn custom"}onClick={onSubmit}>Valider</button>
                        </MDBCardBody>
                        
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
const postContract = async (contract_number: string, client_name: string, parts: number[], cash: number[], date: Date): Promise<void> => {
    const formattedDate = date.toISOString().split('T')[0];
    const body = {
        contract_number: contract_number,
        client_name: client_name,
        parts: parts,
        cash: cash,
        date: formattedDate
    };
    try {
        await axios.post('http://localhost:4002/api/v1/contracts', body);
    } catch (err) {
        console.error('Could not add contract :', err);
        throw err;
    }
}
