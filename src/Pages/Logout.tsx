import React, {useEffect} from 'react';
import {MDBContainer, MDBRow } from 'mdb-react-ui-kit';

export default function Logout() {
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("token", "disconnected")
            window.location.replace("/");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
              <h3>Vous avez été déconnecté avec succès, vous allez être redirigé d'ici quelques secondes</h3>
            </MDBRow>
        </MDBContainer>
    );
}

