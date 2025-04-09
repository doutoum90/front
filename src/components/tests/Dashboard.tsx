import { useEffect, useState } from 'react';
import { fetchScrapedData } from './api';
import ChartComponent from './ChartComponent';

const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchScrapedData('https://concurrent.com');
            console.log('eure', result);
            setData(result);
        };
        loadData();
    }, []);

    return (
        <div>
            <h1>Veille Concurrentielle</h1>
            <ChartComponent data={data} />
        </div>
    );
};

export default Dashboard;