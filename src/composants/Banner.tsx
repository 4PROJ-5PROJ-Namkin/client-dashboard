import { useEffect, useState } from "react";
import "../styles/home.css";
import { isUserLoggedIn } from "../utility/auth";
import {useNavigate } from 'react-router-dom';

export default function Banner() {
    const navigate = useNavigate();
    const [showConnexion, setShowConnexion] = useState(true);

    useEffect(() => {
        if (isUserLoggedIn()) {
            setShowConnexion(false)
        }
      });
    return (
            <div className={"bannerPic"}>
                <h1 className={"bannerTxt"}>Dashboards and contracts management</h1>
                {showConnexion && (
                        <a type="button"  href="/Login" className={"btn custom"}>Login</a>
                )}
            </div>
    )
}

