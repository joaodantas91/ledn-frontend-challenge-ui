import { Link } from "react-router-dom";
import './styles.css';
import { useContext } from "react";
import { LanguageContext } from "../../../App";
import { Languages } from "../../../types/Languages";

export default function Header() {
    const {setLanguage} = useContext(LanguageContext)
    
    return <header className="screen-header">
        <nav>
            <Link to={`/`}>
                Dashboard 
                <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(157,233,250,1)" width={12} viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </Link>
            <Link to={`/planets`}>
                Planets
                <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(157,233,250,1)" width={12} viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </Link>
        </nav>

        <select 
            name="language-selector" 
            id="language-selector"
            onChange={(e) => {
                setLanguage(e.target.value as Languages)
            }}
        >
            <option value={Languages.galacticBasic} selected>Galactic Basic</option>
            <option value={Languages.droidobeshDepot}>Droidobesh Depot</option>
        </select>
    </header>
}