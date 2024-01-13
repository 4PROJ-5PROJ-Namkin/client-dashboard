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
  return (
    <div>
      {/* <h2 className='center'>Titre du rapport</h2> */}
      <iframe title="Supply Chain Namkin" width="1140"  className='reports'  height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=1d011c1e-611b-4612-a48f-d2f80cbc9d47&autoAuth=true&ctid=1dc8f08a-46f6-4cdb-b8ff-03e46c14979d"></iframe>
      {/* <iframe title="test"width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=17145a5f-ea8f-4541-9e35-d8529313dbf4&autoAuth=true&ctid=1dc8f08a-46f6-4cdb-b8ff-03e46c14979d" ></iframe> */}
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
