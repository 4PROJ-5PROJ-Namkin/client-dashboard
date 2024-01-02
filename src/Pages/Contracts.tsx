import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Contract.css";
import { Contract } from '../props/types';

export default function Contracts() {
    useEffect(() => {
        if (!isConnected()) {
            window.location.replace('/');
            throw new Error('Page interdite');
        }
        fetchContracts();
    }, []);

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchContracts = async () => {
        try {
            const response = await axios.get('http://localhost:4002/api/v1/contracts');
            setContracts(response.data);
        } catch (error) {
            console.error('Error fetching contracts:', error);
        }
    };
    const toggleSortOrder = () => setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');

    const sortedContracts = contracts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.date.localeCompare(b.date);
        }
        return b.date.localeCompare(a.date);
    });

    return (
        <div className="container">
            <div className="topbox">
                <h1 className="title">Liste des contrats</h1>
                <button className="button" onClick={toggleSortOrder}>
                    Trier par numéro de contrat ({sortOrder === 'asc' ? 'Descendant' : 'Ascendant'})
                </button>
            </div>  
            <ul>
                {sortedContracts.map((contract) => (
                    <li key={contract.id} className="classItem">
                        <a href={"/contract/" + contract.id}>
                            <div className="classSubItem">Contract Number: {contract.contract_number}</div>
                            <div className="classSubItem">Client Name: {contract.client_name}</div>
                            <div className="classSubItem">Date: {contract.date.toString().split('T')[0]}</div>
                            <div className="classSubItem">Total: {contract.cash.reduce((a: any, b: any) => a + b, 0)} €</div>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="bottombox">
                <a href="/Contrat">Ajouter un contrat</a>
                </div>
        </div>
    );
}

function isConnected() {
    var token = localStorage.getItem("token");
    return !(token === null || token === "disconnected");
}
