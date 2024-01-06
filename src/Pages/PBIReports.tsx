import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, IEmbedConfiguration } from 'powerbi-client';
import { useMsal } from '@azure/msal-react';
// import { getAccessToken } from '../auth/authProvider';
import jwtDecode, { JwtPayload } from 'jwt-decode';
interface PowerBIReportProps {
  reportId: string;
  embedUrl: string;
}

interface MyToken extends JwtPayload {
  role?: string; 
}
const PowerBIReport: React.FC<PowerBIReportProps> = ({ reportId, embedUrl }) => {
  const { instance, accounts } = useMsal();
  const [embedConfig, setEmbedConfig] = useState<IEmbedConfiguration | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthorized(checkUserRole());
            setEmbedConfig({
            type: 'report',
            tokenType: models.TokenType.Embed,
            accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSIsImtpZCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMWRjOGYwOGEtNDZmNi00Y2RiLWI4ZmYtMDNlNDZjMTQ5NzlkLyIsImlhdCI6MTcwNDIwNjM5MywibmJmIjoxNzA0MjA2MzkzLCJleHAiOjE3MDQyMTA3ODQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VkFBQUFhUXhQQ3FoKzN5K216TG53bHpjc3FDNlo5MzlyMU5nR1pVTm45c3FsS20wV0VaYVM4VCtXalkwalI3RlRLbDYrd1ovMkVNT1h2SVVDbjlmbSs4RmxmS1c4anZCbk8rM0xURU5VTTlySkxqRT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJFaXNjaGVuIiwiZ2l2ZW5fbmFtZSI6IkNsw6ltZW50IiwiaXBhZGRyIjoiMmEwMTpjYjAwOjhjNzY6NmUwMDo4MTAzOjQyNmM6YWY1YjphMTY1IiwibmFtZSI6IkNsw6ltZW50IEVpc2NoZW4iLCJvaWQiOiI3NWE1OTlkNS1mZmM0LTRkMjQtYjI5MS0wM2RkZGYwNTcyNjEiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMjIyMjAxNDkyNC00MTY3NzE3NjM3LTI1NzI3ODI2MjktMjkyNjgiLCJwdWlkIjoiMTAwMzIwMDIwRDkxNzAzRiIsInJoIjoiMC5BVndBaXZESUhmWkcyMHk0X3dQa2JCU1huUWtBQUFBQUFBQUF3QUFBQUFBQUFBQmNBS00uIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiWFpySHVhc1huZTBCcGxONjZ5cmU1dzI5WGRJUEtkNmJWM2JuVmlNQ0RIQSIsInRpZCI6IjFkYzhmMDhhLTQ2ZjYtNGNkYi1iOGZmLTAzZTQ2YzE0OTc5ZCIsInVuaXF1ZV9uYW1lIjoiY2xlbWVudC5laXNjaGVuQHN1cGluZm8uY29tIiwidXBuIjoiY2xlbWVudC5laXNjaGVuQHN1cGluZm8uY29tIiwidXRpIjoic0x2bk1pQ0xna3E0NkRQZGp3TjhBZyIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.s24nbRudf96-mqW4mYpL_V6esR18a7mTB69O2Pp5mkafXInmxu7vTfnuvCMABlMgF0g8Hdm2mkI1ULDkNS3ZB7aOGdCMkfRdZvxQfhD5KPdzcoS5ZVtpe8TjP-uCD-w1ORZKKbF8efSW8PSQ0I9wBCRueXAu-wJnUTV2BT3pmijCFbLyH9XWETsbghW7nBLq2CWcgkIDvkgqfTKafZIrKPCSpuG39XUY5BNIBowaHNYE3_6_OAhCY4sHq5IdMCZk8FWR6D9FLkthKR1QE0hzd6LyVZw5pjiTVioyRWMOtHWN26eLCF6LNRTBsyPaSLbNfHcyDdhFBzBdMj9dP_R-2w",
            embedUrl: embedUrl,
            id: reportId
          });
  }, [accounts, instance, reportId, embedUrl]);
  if (!isAuthorized) {
    return <div>Unauthorized Access</div>;
  }
  return (
    <iframe title="test" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=17145a5f-ea8f-4541-9e35-d8529313dbf4&autoAuth=true&ctid=1dc8f08a-46f6-4cdb-b8ff-03e46c14979d" ></iframe>
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
