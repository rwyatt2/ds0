'use client';

import { HeatMap } from '../../../../components/react/heat-map';

const data = [
    [5, 10, 15, 20, 25, 30, 35],
    [8, 12, 18, 22, 28, 32, 38],
    [3, 7, 11, 16, 21, 26, 31],
    [6, 14, 19, 24, 29, 34, 40],
    [2, 9, 13, 17, 23, 27, 33],
];

const rowLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const colLabels = ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am'];

export function HeatMapPreview(): React.ReactElement {
    return (
        <div className="w-full max-w-lg">
            <HeatMap
                data={data}
                rowLabels={rowLabels}
                colLabels={colLabels}
                colorScale="blue"
                title="Activity by Day & Hour"
                showValues
            />
        </div>
    );
}
