import React, { CSSProperties, useEffect, useState } from 'react';
import { useClassList } from "../composants/ClassList";
import "../styles/Class.css";

export default function Classes() {
    useEffect(() => {
        if(!isConnected()){
            window.location.replace('/');
            throw new Error('Page interdite');
        }
    }, []);
    const { data, loading, error } = useClassList();
    const [sortOrder, setSortOrder] = useState('asc');

    if (loading) return <p>Loading...</p>;
    if (error) return <pre>{error.message}</pre>;

    // Sort by name based on sortOrder
    const sortedClasses = [...data.GetAllClass].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    // Toggle sorting order
    const toggleSortOrder = () => setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');

    return (
        <div className="container">
    <div className="topbox">
        <h1 className="title">Liste des classes</h1>
        <button className="button" onClick={toggleSortOrder}>
            Trier par nom ({sortOrder === 'asc' ? 'Descendant' : 'Ascendant'})
        </button>
    </div>
    <ul>
        {sortedClasses.map((single) => (
            <a href={"classes/single/" + single.id}>
                <li key={single.id} className="classItem">
                    <div className="classSubItem">Name: {single.name}</div>
                    <div className="classSubItem">Capacité: {single.capaciter}</div>
                    <div className="classSubItem">ID: {single.id}</div>
                    <div className="classSubItem">Professor ID: {single.professeur_Id}</div>
                </li>
            </a>
        ))}
    </ul>
    <div className="bottombox">
        <a href="/classes/new">Ajouter une classe</a>
        <a href="/classes/single">Chercher une classe</a>
    </div>
</div>

    );
}

function isConnected() {
    var token = localStorage.getItem("token");
    
    if (token === null || token === "disconnected") {
        return true;
    }
    return true;

}

