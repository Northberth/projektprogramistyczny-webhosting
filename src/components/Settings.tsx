import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <>
            <p>Ustawienia (Settings)</p>
            <div>
                <ul>
                    <li><Link to='/mousetest'>Test Myszki (Mouse Test)</Link></li>
                    <li><Link to='/keyboardtest'>Test Klawiatury (Keyboard Test)</Link></li>
                </ul>
            </div>
        </>
    );

}
export default Settings;