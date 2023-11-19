import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

export const DateSection = ({ data: dashboardData }) => {
    const [charX, setCharX] = useState(null);
    const [charY, setCharY] = useState(null);

    useEffect(() => {
        if (dashboardData != null) {
            const colorsData = dashboardData.dates;

            // Extract the dates and values into their own arrays
            const xAxisData = colorsData.map(item => item.date);
            const seriesData = colorsData.map(item => item.value);

            setCharX(xAxisData);
            setCharY(seriesData);

        }
    }, [dashboardData]);

    if (dashboardData == null) return;

    return (
        <>{charY &&
            <LineChart
                series={[
                    {
                        data: charY,
                        color: "#2196f3",
                        label: 'Pastillas'
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: charX }]}
                width={500}
                height={300}
            />
        }</>
    );


};

export default DateSection;
