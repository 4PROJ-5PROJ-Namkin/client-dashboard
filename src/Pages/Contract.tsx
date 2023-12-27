import React, { CSSProperties, useState } from 'react';
import SelectContracts from '../composants/selectContracts';

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
import { Link } from "react-router-dom";

export default function Classes() {
    const studentId = "63f9416a-a59b-4407-bdc2-d2c5556e633f"; // this can be dynamic
    //const { data, loading, error } = useGradesList(studentId);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <pre>{error.message}</pre>;

 
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
  
    return (
        <MDBContainer fluid className='my-5' >
            <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Ajout d'un contrat</h2>
                            <div className='flexed'>
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Numéro de contrat' id='Nom' type='text' />
                                <MDBInput wrapperClass='mb-4' className="halfWitdh" label='Nom du client' id='client' type='text' />
                            </div>
                            <MDBInput wrapperClass='mb-4' label='Date' id='date' type='date' value={formattedDate} />                            <SelectContracts/>

                            <MDBBtn className='w-100 mb-4' size='sm' onClick={Register}>Valider</MDBBtn>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
const Register = () => {
    var professorName = "";

    // First, we find the professor ID by their name
    // findProfessorByName({
    //     variables: {
    //         lastName: professorName
    //     }
    // });
};
