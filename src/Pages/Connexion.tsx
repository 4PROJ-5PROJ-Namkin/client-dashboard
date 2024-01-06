import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from "axios";
import {useNavigate, Link } from 'react-router-dom';

export default function Connexion() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const navigate = useNavigate();

    const connect = async () => {
        if (password.length < 6) { 
            setShowPasswordError(true);
            return;
        } else {
            setShowPasswordError(false);
        }

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.data);
            navigate('/Liste');
        } catch (error) {
            console.error('Connection error:', error);
            setShowLoginError(true); // Show login error
        }
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom container reducesize">
            <MDBRow className='customRow'>
                <MDBCol col='4' md='6'>
                    <MDBInput wrapperClass='mb-4' label='Mail' type='email' size="lg" 
                              onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Mot de passe' type='password' size="lg" 
                              onChange={(e) => setPassword(e.target.value)} />
                    {showPasswordError && (
                        <div className="alert alert-warning" role="alert">
                            Le mot de passe n'est pas assez fort
                        </div>
                    )}
                    {showLoginError && (
                        <div className="alert alert-warning" role="alert">
                            Identifiant ou mot de passe incorrect!
                        </div>
                    )}
                    <div className='text-center text-md-start mt-4 pt-2'>
                        <button type="button"  className={"btn custom"}onClick={connect}>Valider</button>
                        <p className="small mt-2 pt-1 mb-2">Pas encore de compte ? <Link to={"/Inscription"}>Inscription</Link></p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export const login = async (email: string, password: string) => {
    const body = { email, password };
    const res = await axios.post('http://localhost:3000/login', body);
    return res;
}
