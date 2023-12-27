import {Route, Routes} from 'react-router-dom';
import Header from './composants/Header'
import Contact from "./Pages/Contact";
import Connexion from "./Pages/Connexion";
import Profile from "./Pages/Profile";
import Inscription from "./Pages/Inscription";
import Logout from "./Pages/Logout";
import Notes from "./Pages/Contract";
import Classes from "./Pages/Classes";
import SingleClass from "./Pages/SingleClass";




import Home from "./Pages/Home";
import './styles/index.css';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (<div>
    <header>
      <Header />
    </header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="Contact" element={<Contact />}/>
        <Route path="Connexion" element={<Connexion />}/>
        <Route path="Logout" element={<Logout />}/>
        <Route path="Profil" element={<Profile />} />
        <Route path="Contrat" element={<Notes />} />
        <Route path="Classes" element={<Classes />} />
        <Route path="Inscription" element={<Inscription />}/>
        {/* <Route path="classes/new" element={<NewClass />}/> */}
        <Route path="classes/single/:id" element={<SingleClass />} />

      </Routes>
    <footer>

    </footer>
  </div>)
}
