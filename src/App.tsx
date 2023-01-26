import React from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';



export default function App() {   
    return (
        <>
            <div>
                <ul>
                    <li><Link to='/'>Strona Główna (Main Page)</Link></li>
                    <li><Link to='/settings'>Ustawienia (Settings)</Link></li>
                    <li><Link to='/statistics'>Statystyki (Statistics)</Link></li>
                </ul>
                <hr />
                <Main />
            </div>
        </>
    )
}
