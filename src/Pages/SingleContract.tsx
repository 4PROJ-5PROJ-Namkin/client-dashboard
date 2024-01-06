import React, { useEffect, useState, CSSProperties } from 'react';
import "../styles/Contract.css";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import SelectContracts from '../composants/selectContracts';
import { RowData, Part } from '../props/types';
import "../styles/Contract.css"


interface ContractData {
    id: string;
    contract_number: string;
    client_name: string;
    date: string;
    cash: number[];
    parts: number[];
}

interface TableRowData {
    cash: number;
    parts: number;
    quantity: number;
}

export default function SingleContract() {
    const { contract_number } = useParams<{ contract_number: string }>();
    const [contractData, setContractData] = useState<ContractData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [rows, setRows] = useState<RowData[]>([{ id: 0, quantity: 1, price: 0 }]);
    const [parts, setParts] = useState<Part[]>([]);
    const [client_name, setName] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const formattedDate = contractData?.date.split('T')[0];

    const computeTableRows = (): TableRowData[] => {
        const rowMap = new Map<string, TableRowData>();

        contractData?.cash.forEach((cash, index) => {
            const parts = contractData.parts[index];
            const key = `${cash}-${parts}`;

            if (rowMap.has(key)) {
                rowMap.get(key)!.quantity++;
            } else {
                rowMap.set(key, { cash, parts, quantity: 1 });
            }
        });

        return Array.from(rowMap.values());
    };
    const tableRows = computeTableRows();
    useEffect(() => {
    fetch(`http://localhost:4002/api/v1/contracts/${contract_number}`)
        .then(response => response.json())
        .then((data: ContractData) => {
            setContractData(data);
            setName(data.client_name);
            setDate(new Date(data.date));

            // Convert cash and parts arrays to RowData format
            const convertedRows: RowData[] = data.cash.map((cash, index) => ({
                id: data.parts[index],
                quantity: 1, // Default quantity
                price: cash
            }));

            setRows(convertedRows);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setError(error);
            setLoading(false);
        });
}, [contract_number]);


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
    const deleteContract = async() => {
        try {
            if(contract_number !== undefined){
             await removeContract(contract_number);
            }
        //    window.location.replace("/liste");
        } catch (error) {
            console.error('Error removing contract :', error);
        }        
    }
    const onSubmit = async () => {
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
            if(contract_number !== undefined){
             await updateContract(contract_number, client_name, partsTreated, cash, date);
            }
        } catch (error) {
            console.error('Error updating contract:', error);
        }
    };
    
    return (
        <div className='container-flex'>
            <MDBContainer className='card-container'>
                <MDBCard className='card'>
                    <MDBCardBody>
                        <div className='flexed-dist'>
                            <h5 className="card-title">Contract Details</h5>
                            <button onClick={deleteContract}><h5 className="card-title">Supprimer</h5></button>

                        </div>
                        <p><strong>Contract Number:</strong> {contractData?.contract_number}</p>
                        <p><strong>Client Name:</strong> {contractData?.client_name}</p>
                        <p><strong>Date:</strong> {contractData?.date ? new Date(contractData.date).toLocaleString() : 'No date has been set'}</p>
                        <div>
                            <table className={"tableCenter"}>
                                <thead>
                                    <tr>
                                        <th>Cash</th>
                                        <th>Parts</th>
                                        <th>Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.cash}</td>
                                            <td>PART_NO_{row.parts}</td>
                                            <td>{row.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </MDBCardBody>
                </MDBCard>
                <button type="button"  className={"btn custom"}onClick={() => setIsEditing(!isEditing)}>Mettre à jour ce contrat</button>
            </MDBContainer>

            {isEditing && (
                <MDBContainer fluid className='my-5'>
                    <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                        <MDBCol col='6'>
                            <MDBCard className='my-5 cascading-right'>
                                <MDBCardBody className='p-5 shadow-5 text-center'>
                                    <h2 className="fw-bold mb-5">Mise à jour du contrat</h2>
                                    <div className='flexed'>
                                        <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Numéro de contrat' id='Nom' type='text'   value={contractData?.contract_number}/>
                                        <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Nom du client' id='client' type='text' onChange={(e) => setName(e.target.value)} placeholder={contractData?.client_name}/>
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
                                    <button type="button"  className={"btn custom"}onClick={onSubmit}>Valider</button>
                                </MDBCardBody>
                                
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
        </div>
    );
}

const updateContract = async ( contract_number: string, client_name: string, parts: number[], cash: number[], date: Date): Promise<void> => {
    const body = {
        client_name: client_name,
        parts: parts,
        cash: cash,
        date: date
    };

    try {
        await axios.put('http://localhost:4002/api/v1/contracts/'+ contract_number, body);
    } catch (err) {
        console.error('Could not update contract :', err);
        throw err;
    }
}
const removeContract = async (contract_number : string): Promise<void> => {
    try {
        await axios.delete('http://localhost:4002/api/v1/contracts/'+ contract_number);
    } catch (err) {
        console.error('Could not delete contract :', err);
        throw err;
    }
}