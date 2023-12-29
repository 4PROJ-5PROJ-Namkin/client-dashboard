import React, { useEffect } from 'react';
import "../styles/SingleClass.css";
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
import { Link, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { useQuery, gql, useMutation } from '@apollo/client';

const FIND_CLASS_BY_ID_QUERY = gql`
query FindOneClassById($id: String!) {
    findOneClassById(id: $id) {
        capaciter
        id
        listEleves
        name
        professeur_Id
    }
}
`;

const CREATE_GRADE = gql`
    mutation Create(
        $classe_id: String!,
        $grade: Float!, 
        $listEleves: profId!, 
        $student_id: String!
        ) {
            create(
                createGradeInput: {classe_id: $classe_id, grade: $grade, professor_id: $profId, student_id: $student_id}
            ) {
                id      
            }
    }
    
`;



export default function Ajout() {
    const { id } = useParams();
    console.log(id);
    const { loading, error, data } = useQuery(FIND_CLASS_BY_ID_QUERY, {
        variables: { id }
    });

    useEffect(() => {
        // if(!isAdmin()){
        //     window.location.replace('/');
        //     throw new Error('Page interdite');
        // }
    }, []);

    const [exec, { dataMutate }] = useMutation(CREATE_GRADE);

    const createGrade = (profId) => {
        var nom = document.getElementById('Nom').value;
        var capacity = document.getElementById('capacite').value;
        var listEleves = document.getElementById('listEleves').value;
        var profId // Comes from session token 
        exec({
            variables: {
                classe_id: capacity,
                grade: nom,
                professor_id: profId,
                student_id: listEleves
            }
        });
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const classData = data.findOneClassById;

    


    return (
        <div className='container-flex'>
        <MDBContainer className='card-container'>
          <MDBCard className='card'>
            <MDBCardBody>
              <h5 className="card-title">{classData.name}</h5>
              <p><strong>ID:</strong> {classData.id}</p>
              <p><strong>Capacité:</strong> {classData.capaciter}</p>
              <p><strong>Liste des étudiants:</strong> <span className="idToSelect">{classData.listEleves}</span></p>
              <p><strong>ID du professeur:</strong> {classData.professeur_Id}</p>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      
        <MDBContainer className='card-container'>
          <MDBCard className='card'>
            <MDBCardBody className='input-container'>
              <h2 className="bold-title">Noter un élève</h2>
              <MDBInput label="Id de l'élève" id='studentId' type='text' />
              <MDBInput label='Note' id='Grade' type='text' />
              <MDBBtn className='full-width-btn' onClick={createGrade}>Valider</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
      
    );
}


function isAdmin() {
    var token = localStorage.getItem("token");
    if (token === null || token === "disconnected") {
        return false;
    }
    var decoded = jwtDecode(token);
    if (decoded.role === "admin") {
        return true;
    }
    return false;
}
