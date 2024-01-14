import React, {useEffect} from 'react';
import {MDBContainer, MDBRow } from 'mdb-react-ui-kit';

export default function Logout() {
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.removeItem("token")
            window.location.replace("/");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">
            <MDBRow>
              <h3>You have been successfully disconnected, you will be redirected in a few seconds</h3>
            </MDBRow>
        </MDBContainer>
    );
}

