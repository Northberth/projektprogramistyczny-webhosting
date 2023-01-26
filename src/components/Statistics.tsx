import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Statistics = () => {
    const [statistics, setStatistics] = useState('');
    useEffect(() => {
        loadStatistics();
    }, []);

    function loadStatistics() {
        fetch("statistics.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setStatistics(JSON.stringify(data));
            })
    }
    return (
        <>
            <p>Statystyki (Statistics)</p>
            <div>
                <p>{statistics}</p>
            </div>
        </>
    );

}
export default Statistics;