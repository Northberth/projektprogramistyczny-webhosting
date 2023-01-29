import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';
import { MyGlobalContext } from './components/MyGlobalContext';



export default function App() { 
    const [copy, setCopy] = useState<string>("Welcome user!");  
    return (
        <>
            <div>
                <MyGlobalContext.Provider value={{copy,setCopy}}>
                    <ul>
                        <li><Link to='/'>Strona Główna (Main Page)</Link></li>
                        <li><Link to='/settings'>Ustawienia (Settings)</Link></li>
                        <li><Link to='/statistics'>Statystyki (Statistics)</Link></li>
                    </ul>
                </MyGlobalContext.Provider>
                <hr />
                <Main />
            </div>
        </>
    )
}
