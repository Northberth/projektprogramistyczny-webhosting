import { useEffect, useState } from 'react';

const Statistics = () => {
    const [, setStatistics] = useState('');
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
            <table className="table table-bordered table-hover table-condensed">
                <thead><tr><th title="Field #1">players/id</th>
                    <th title="Field #2">players/name</th>
                    <th title="Field #3">players/category</th>
                    <th title="Field #4">players/moves</th>
                    <th title="Field #5">players/points</th>
                </tr></thead>
                <tbody><tr>
                    <td align="right">1</td>
                    <td>Player_1</td>
                    <td>Zwierzęta</td>
                    <td align="right">6</td>
                    <td>87,5</td>
                </tr>
                    <tr>
                        <td align="right">2</td>
                        <td>Player_1</td>
                        <td>Jedzenie</td>
                        <td align="right">9</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <td align="right">3</td>
                        <td>Player_2</td>
                        <td>Informatyka</td>
                        <td align="right">10</td>
                        <td>20</td>
                    </tr>
                </tbody></table>
        </>
    );

}
export default Statistics;