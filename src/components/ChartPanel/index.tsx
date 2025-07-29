import { useEffect, useState } from "react"
import { useAnthill } from "../../contexts/AnthillContext"
import "./index.css"
import { CartesianGrid, Area, AreaChart, YAxis, Tooltip } from "recharts"
import { Cell } from "../../types/Cells/Cell"
import { AirCell } from "../../types/Cells/AirCell"

interface GridInfo {
    exploringPheromon: number
    returningPheromon: number
    index: number
}

const getGridInfo = (grid: (Cell | null)[][][]): GridInfo[] => {
    let i = 0

    return grid
        .flatMap(column =>
            column.flatMap(row =>
                row
                    .map(cell => {
                        i += 1
                        if(cell == null) return {
                            exploringPheromon: 0,
                            returningPheromon: 0,
                            index: i,
                        }

                        const { exploringPheromon, returningPheromon } = cell as AirCell;
                        return {
                            exploringPheromon: Math.round(exploringPheromon * 10**7) / 10**7,
                            returningPheromon: Math.round(returningPheromon * 10**7) / 10**7,
                            index: i,
                        };
                    })
            )
        );
};

const ChartPanels = () => {
    const { grid,  } = useAnthill()
    const [gridInfo, setGridInfo] = useState<GridInfo[]>([])

    useEffect(() => {
        if (grid !== null) {
            setGridInfo(getGridInfo(grid))
        }
    }, [grid])

    return (
        <div className="chart-panels-container">
            <AreaChart
                width={500}
                height={300}
                data={gridInfo}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                <linearGradient id="exploringGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="violet" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="violet" stopOpacity={0} />
                </linearGradient>
                </defs>
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="exploringPheromon"
                    stroke="violet"
                    fill="violet"
                />
            </AreaChart>
            <AreaChart
                width={500}
                height={300}
                data={gridInfo}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                <linearGradient id="returningPheromon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="cyan" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="cyan" stopOpacity={0} />
                </linearGradient>
                </defs>
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="returningPheromon"
                    stroke="cyan"
                    fill="cyan"
                />
            </AreaChart>
        </div>
    )
}

export default ChartPanels