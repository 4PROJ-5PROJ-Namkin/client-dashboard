import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, IEmbedConfiguration } from 'powerbi-client';

import jwtDecode, { JwtPayload } from 'jwt-decode';
interface PowerBIReportProps {
  reportId: string;
  embedUrl: string;
}

interface MyToken extends JwtPayload {
  role?: string; 
}
const PowerBIReport: React.FC<PowerBIReportProps> = ({ reportId, embedUrl }) => {
  // const { instance, accounts } = useMsal();
  const [embedConfig, setEmbedConfig] = useState<IEmbedConfiguration | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthorized(checkUserRole());

  });
  if (!isAuthorized) {
    return <div>Unauthorized Access</div>;
  }
  const url : string = "https://app.powerbi.com/reportEmbed?reportId=" + reportId + "&autoAuth=true&ctid=1dc8f08a-46f6-4cdb-b8ff-03e46c14979d" ;
  return (
    <div>
      {/* <h2 className='center'>Titre du rapport</h2> */}
      <iframe title="Namkin" width="1140" className='reports' height="541.25" src={url} allowFullScreen></iframe>      
        </div>
  )
};

export default PowerBIReport;

function checkUserRole() : boolean{
  var token = localStorage.getItem("token");
   if(token !== null){
    const decodedToken = jwtDecode<MyToken>(token);
    if(decodedToken.role === "commercial"){ //might need to be changed to admin 
        return true;
      }
    };
    return false;

}
