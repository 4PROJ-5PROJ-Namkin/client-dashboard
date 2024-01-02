import {Route, Routes} from 'react-router-dom';
import Header from './composants/Header'
import Contact from "./Pages/Contact";
import Connexion from "./Pages/Connexion";
import Profile from "./Pages/Profile";
import Inscription from "./Pages/Inscription";
import Logout from "./Pages/Logout";
import Notes from "./Pages/NewContract";
import Contracts from "./Pages/Contracts";
import SingleContract from "./Pages/SingleContract";
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
        <Route path="Contracts" element={<Contracts />} />
        <Route path="Inscription" element={<Inscription />}/>
        {/* <Route path="classes/new" element={<NewClass />}/> */}
        <Route path="contract/:id" element={<SingleContract />} />

      </Routes>
    <footer>

    </footer>
  </div>)
}
