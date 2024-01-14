import React, { useState } from 'react';
import {useNavigate, Route, Routes } from 'react-router-dom';
import Header from './composants/Header';
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import Logout from "./Pages/Logout";
import Contract from "./Pages/NewContract";
import Contracts from "./Pages/Contracts";
import SingleContract from "./Pages/SingleContract";
import Home from "./Pages/Home";
import PowerBIReport from "./Pages/PBIReports";
import NotFound from './Pages/NotFound';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const navigate = useNavigate();
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Function to toggle between interfaces
  const toggleInterface = () => {
    setShowDashboard(!showDashboard);
    setIsToggleActive(!isToggleActive);
    navigate('/');
  };

  return (
    <div>
      <header>
        <Header onToggleInterface={toggleInterface} isToggleActive={isToggleActive}/>
      </header>
      {showDashboard ? (
        <Routes>
          <Route path="/" element={<PowerBIReport reportId={'9f5830b9-2cd2-4103-965d-bcc452fed443'} embedUrl={'https://app.powerbi.com/reportEmbed?reportId=17145a5f-ea8f-4541-9e35-d8529313dbf4&autoAuth=true&ctid=1dc8f08a-46f6-4cdb-b8ff-03e46c14979d'} />} />
          <Route path="*" element={<NotFound />} /> 
          <Route path="Déconnexion" element={<Logout />} />

        </Routes>

          ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Connexion" element={<Connexion />} />
          <Route path="Déconnexion" element={<Logout />} />
          <Route path="Ajout" element={<Contract />} />
          <Route path="Liste" element={<Contracts />} />
          <Route path="Inscription" element={<Inscription />} />
          <Route path="contract/:contract_number" element={<SingleContract />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      )}
    </div>
  );
}
