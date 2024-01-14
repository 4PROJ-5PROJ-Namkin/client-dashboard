import React, { useEffect, useState } from 'react';
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
    const [currentPage, setCurrentPage] = useState(1);
    const contractsPerPage = 9; 

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

    const indexOfLastContract = currentPage * contractsPerPage;
    const indexOfFirstContract = indexOfLastContract - contractsPerPage;
    const currentContracts = sortedContracts.slice(indexOfFirstContract, indexOfLastContract);
    const paginate = (pageNumber : number) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(contracts.length / contractsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
            <div className="topbox">
                <h1 className="title">Contracts list</h1>
                <button className="button" onClick={toggleSortOrder}>
                    Order by contract number ({sortOrder === 'asc' ? 'Descendant' : 'Ascendant'})
                </button>
            </div>  
            <div className="contractList">
                {currentContracts.map((contract) => (
                    <div key={contract.id} className="contractItem">
                        <a href={"/contract/" + contract.contract_number}>
                            <div className="classSubItem">Contract Number: {contract.contract_number}</div>
                            <div className="classSubItem">Client Name: {contract.client_name}</div>
                            <div className="classSubItem">Date: {contract.date.toString().split('T')[0]}</div>
                            <div className="classSubItem">Total: {contract.cash.reduce((a, b) => a + b, 0)} €</div>
                        </a>
                    </div>
                ))}
            </div>
            <nav>
                <ul className='pagination' >
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} className='page-link' style={{"color" : "black"}}>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="bottombox">
                <a type="button" href="/Ajout" className={"btn custom"}>New contract</a>
            </div>
        </div>
    );
}

function isConnected() {
    var token = localStorage.getItem("token");
    return !(token === null || token === "disconnected");
}
