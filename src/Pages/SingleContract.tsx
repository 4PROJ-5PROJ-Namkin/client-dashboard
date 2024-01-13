import React, { useEffect, useState, CSSProperties } from 'react';
import "../styles/Contract.css";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import SelectContracts from '../composants/selectContracts';
import { RowData, Part } from '../props/types';
import "../styles/Contract.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
    const [showRMSuccess, setShowRMSuccess] = useState(false);
    const [rows, setRows] = useState<RowData[]>([{ id: 0, quantity: 1, price: 0 }]);
    const [parts, setParts] = useState<Part[]>([]);
    const [client_name, setName] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const formattedDate = contractData?.date.split('T')[0];
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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
                const convertedRows: RowData[] = data.cash.map((cash, index) => ({
                    id: data.parts[index],
                    quantity: 1,
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
    const deleteContract = async () => {
        try {
            if (contract_number !== undefined) {
                const confirmDelete = window.confirm("Voulez-vous supprimer ce contrat ?");
                if (confirmDelete) {
                    await removeContract(contract_number);
                    setShowRMSuccess(true);
                }
            }
        } catch (error) {
            console.error('Impossible de supprimer le contrat :', error);
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
            if (contract_number !== undefined) {
                await updateContract(contract_number, client_name, partsTreated, cash, date);
                setShowSuccess(true);
            }
        } catch (error) {
            setShowError(true);
            console.error('Impossible de mettre à jour le contrat : ', error);
        }
    };

    return (
        <div className='container-flex'>
            <MDBContainer className='card-container'>
                <MDBCard className='card'>
                    <MDBCardBody>
                        <div className='flexed-dist'>
                            <h5 className="card-title">Détails du contrat</h5>
                            <button onClick={deleteContract} className="btn icon">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                        <div className='flex' >
                            <div style={{ marginRight: "50px" }}>

                                <p><strong>Numéro de contrat:</strong> {contractData?.contract_number}</p>
                                <p><strong>Nom du client:</strong> {contractData?.client_name}</p>
                                <p><strong>Date:</strong> {formattedDate ? formattedDate : 'No date has been set'}</p>
                            </div>
                            <div>
                                <table className={"tableCenter"}>
                                    <thead>
                                        <tr>
                                            <th>Prix</th>
                                            <th>Pièce</th>
                                            <th>Quantité</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRows.map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.cash} €</td>
                                                <td>PART_NO_{row.parts}</td>
                                                <td>{row.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {showRMSuccess && (
                                    <div className="alert alert-success" role="alert">
                                        Contrat supprimé avec succès
                                    </div>
                                )}
                            </div>
                        </div>

                    </MDBCardBody>
                </MDBCard>
                <button type="button" className={"btn custom"} onClick={() => setIsEditing(!isEditing)}>Mettre à jour ce contrat</button>
            </MDBContainer>

            {isEditing && (
                <MDBContainer fluid className='my-5'>
                    <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                        <MDBCol col='6'>
                            <MDBCard className='my-5 cascading-right'>
                                <MDBCardBody className='p-5 shadow-5 text-center'>
                                    <h2 className="fw-bold mb-5">Mise à jour du contrat</h2>
                                    <div className='flexed'>
                                        <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Numéro de contrat' id='Nom' type='text' value={contractData?.contract_number} />
                                        <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Nom du client' id='client' type='text' onChange={(e) => setName(e.target.value)} placeholder={contractData?.client_name} />
                                    </div>
                                    <MDBInput wrapperClass='mb-4' label='Date' id='date' type='date' value={formattedDate} onChange={(e) => setDate(new Date(e.target.value))} />
                                    <SelectContracts
                                        rows={rows}
                                        setRows={setRows}
                                        handleIdChange={handleIdChange}
                                        handleQuantityChange={handleQuantityChange}
                                        handlePriceChange={handlePriceChange}
                                        parts={parts}
                                        setParts={setParts}
                                    />
                                    {showError && (
                                        <div className="alert alert-warning" role="alert">
                                            Impossible de mettre à jour le contrat
                                        </div>
                                    )}
                                    {showSuccess && (
                                        <div className="alert alert-success" role="alert">
                                            Contrat mis à jour avec succès
                                        </div>
                                    )}
                                    <button type="button" className={"btn custom"} onClick={onSubmit}>Valider</button>
                                </MDBCardBody>

                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            )}
        </div>
    );
}

const updateContract = async (contract_number: string, client_name: string, parts: number[], cash: number[], date: Date): Promise<void> => {
    const body = {
        client_name: client_name,
        parts: parts,
        cash: cash,
        date: date
    };

    try {
        await axios.put('http://localhost:4002/api/v1/contracts/' + contract_number, body);
    } catch (err) {
        console.error('Could not update contract :', err);
        throw err;
    }
}
const removeContract = async (contract_number: string): Promise<void> => {
    try {
        await axios.delete('http://localhost:4002/api/v1/contracts/' + contract_number);
    } catch (err) {
        console.error('Could not delete contract :', err);
        throw err;
    }
}