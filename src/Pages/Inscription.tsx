import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import axios from "axios";

export default function Inscription() {
    const [nom, setNom] = useState<string>('');
    const [prenom, setPrenom] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [mdp, setMdp] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');

    const onSubmit = async () => {
        try {
            await postRegister(nom, prenom, mail, mdp, telephone);
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <MDBContainer fluid className='my-5'>
            <MDBRow className='g-0 align-items-center container' style={{ margin: "auto", width: "65vw" }}>
                <MDBCol col='6'>
                    <MDBCard className='my-5 cascading-right eighty' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <MDBCardBody className='p-5 shadow-5 text-center'>
                            <h2 className="fw-bold mb-5">Inscription</h2>
                            <div className="flexed">
                                <MDBInput wrapperClass='mb-4' label='Prénom' id='prenom' type='text' onChange={(e) => setPrenom(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Nom' id='nom' type='text' onChange={(e) => setNom(e.target.value)} />
                            </div>
                            <MDBInput wrapperClass='mb-4' label='Email' id='mail' type='email' onChange={(e) => setMail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Mot de passe' id='form4' type='password' onChange={(e) => setMdp(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Numéro de téléphone' id='telephone' type='tel' onChange={(e) => setTelephone(e.target.value)} />
                            <MDBBtn className='w-100 mb-4' size='lg' onClick={onSubmit}>Valider</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export const postRegister = async (nom: string, prenom: string, email: string, password: string, telephone: string): Promise<void> => {
    const body = {
        first_name: prenom,
        last_name: nom,
        email: email,
        password: password,
        telephoneNumber: telephone
    };

    try {
        await axios.post('http://localhost:3000/register', body);
    } catch (err) {
        console.error('Error in postRegister:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
}
