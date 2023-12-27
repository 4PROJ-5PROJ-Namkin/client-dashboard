import React, { useEffect } from 'react';
import "../styles/Profile.css";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Profile() {
    useEffect(() => {
        if(!isConnected()){
            window.location.replace('/');
            throw new Error('Page interdite');
        }
        // getUsername();
    }, []);
    return (
        <div>
            <div className="gradient-custom-2">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>

                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="ms-3" >
                                        <p className={"setPseudo"}>Pseudo</p>
                                    </div>
                                    <div className="d-flex justify-content-end text-center py-1">

                                        <div>
                                            <MDBCardText className="mb-1 h5">XXX</MDBCardText>
                                            <MDBCardText className="small text-muted mb-0">Réservations</MDBCardText>
                                        </div>

                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <MDBRow>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="g-2">
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                                <div className={"editDiv"}>
                                    <Button className="mb-0 px-5 editP" size='lg' onClick={editProfile}>Editer mon profile</Button>

                                </div>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
            <div className={"editSection"}>
                <MDBContainer fluid className='my-5' id={"edit-container"} >
                    <MDBRow className='g-0 align-items-center container' style={{ margin: "auto" }}>
                        <MDBCol col='6'>
                            <MDBCard className='my-5 cascading-right' style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)' }}>
                                <MDBCardBody className='p-5 shadow-5 text-center'>
                                    <h2 className="fw-bold mb-5">Modifier mon mot de passe</h2>
                                    <MDBInput wrapperClass='mb-4' label='Mot de passe' id='newPass' type='password' />
                                    <MDBBtn className='w-100 mb-4' size='md' onClick={update}>Mettre à jour</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}
function editProfile() {
    document.getElementsByClassName("editSection")[0].style.display = "block";
}

async function update() {
    var newPass = document.getElementById('newPass').value;
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const body = {
        password: newPass
    }
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    };
    try {
        await axios.patch('http://localhost:3000/users/' + decoded.id, body, config);
    } catch (err) {
        console.error(err);
    }
}

async function getUsername() {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    };
    try {
        const res = await axios.get('http://localhost:3000/users/' + decoded.id, config);
        document.getElementsByClassName('setPseudo')[0].textContent = res.data.username;
    } catch (err) {
        console.error(err);
    }
}
function isConnected() {
    var token = localStorage.getItem("token");
    if (token === null || token === "disconnected") {
        return true;
    }
    return true;

}




