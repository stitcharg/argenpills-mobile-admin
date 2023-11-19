import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

export const ColorsSection = ({ data: dashboardData }) => {
    const [charX, setCharX] = useState(null);
    const [charY, setCharY] = useState(null);

    useEffect(() => {
        if (dashboardData != null) {
            const colorsData = dashboardData.colors;

            const colors = Object.keys(colorsData); // Extracting labels (colors)
            const numColors = Object.values(colorsData); // Extracting numerical values

            setCharX(colors);
            setCharY(numColors);
        }
    }, [dashboardData]);

    if (dashboardData == null) return;


    return (
        <>
            {charY &&
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: charX,
                            scaleType: 'band'
                        },
                    ]}
                    series={[
                        {
                            data: charY,
                            color: "#2196f3",
                            label: 'Pastillas'
                        },
                    ]}
                    width={500}
                    height={300}
                />
            }</>
    );


};

export default ColorsSection;
