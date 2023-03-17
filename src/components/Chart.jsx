import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
// import { getdata } from './getdata';
IgrFinancialChartModule.register();

const Chart = ({ Symbol }) => {
    console.log("coinpage : ", Symbol);
    const chartRef = useRef(0);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
    );

    let testData = [];

    const midnight = new Date(today);
    midnight.setHours(0, 0, 0, 0);

    const totalMilliseconds = now - midnight;
    const halfMilliseconds = Math.floor(totalMilliseconds / 2);

    const firstHalfEnd = new Date(midnight.getTime() + halfMilliseconds);
    const secondHalfStart = new Date(firstHalfEnd.getTime() + 1);

    const firstHalf = { start: midnight.getTime(), end: firstHalfEnd.getTime() };
    const secondHalf = { start: secondHalfStart.getTime(), end: now.getTime() };

    let ws = null;

    // console.log("First half:", firstHalf);
    // console.log("Second half:", secondHalf);

    // console.log(today.getTime());
    // console.log(todayMidnight.getTime());

    useEffect(() => {
        fetch(
            `https://api.binance.com/api/v3/uiKlines?symbol=${Symbol}&interval=1m&startTime=${firstHalf.start}&endTime=${firstHalf.end}&limit=1000`
        )
            .then(res => res.json())
            .then(firstHalfData => {
                fetch(
                    `https://api.binance.com/api/v3/uiKlines?symbol=${Symbol}&interval=1m&startTime=${secondHalf.start}&endTime=${secondHalf.end}&limit=1000`
                )
                    .then(res => res.json())
                    .then(secondHalfData => {
                        let newdata = [];

                        testData = [...firstHalfData, ...secondHalfData];

                        console.log(testData);

                        testData.forEach(item => {
                            newdata = [
                                ...newdata,
                                {
                                    date: new Date(item[0]),
                                    open: parseFloat(item[1]),
                                    high: parseFloat(item[2]),
                                    low: parseFloat(item[3]),
                                    close: parseFloat(item[4]),
                                    volume: parseFloat(item[5])
                                }
                            ];
                        });

                        console.log("in second call : ", newdata);

                        chartRef.current.dataSource.push(newdata);
                        chartRef.current.notifyInsertItem(
                            chartRef.current.dataSource,
                            0,
                            newdata
                        );
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });

        startWebSocketData();

        return () => {
            stopWebSocketData();
        };
    }, []);

    const stopWebSocketData = () => {
        if (ws) {
            ws.close();
        }
    };

    const startWebSocketData = url => {
        ws = new WebSocket(
            `wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@kline_1m`
        );

        let data = [];

        ws.onmessage = e => {
            const dataJson = JSON.parse(e.data);

            data.push({
                date: new Date(dataJson.k.t),
                open: parseFloat(dataJson.k.o),
                high: parseFloat(dataJson.k.h),
                low: parseFloat(dataJson.k.l),
                close: parseFloat(dataJson.k.c),
                volume: parseFloat(dataJson.k.v)
            });

            // console.log(new Date().getSeconds());

            if (
                data.length > 2 &&
                data[data.length - 2].date.getTime() !==
                data[data.length - 1].date.getTime()
            ) {
                // console.log(data);
                // Compute the values for the candlestick chart

                let newdata = {
                    date: null,
                    open: null,
                    close: null,
                    high: 0,
                    low: Infinity,
                    volume: 0
                };

                for (const point of data) {
                    // console.log(point);
                    newdata.date = point.date;

                    if (!newdata.open) {
                        newdata.open = point.open;
                    }
                    newdata.close = point.close;
                    newdata.high = Math.max(newdata.high, point.high);
                    newdata.low = Math.min(newdata.low, point.low);
                    newdata.volume = Math.max(newdata.volume, point.volume);
                }

                // console.log(newdata);

                updateChart(newdata);

                // Clear the stored data and innerCounter

                data = [];
            }
        };
    };

    const updateChart = newdata => {
        chartRef.current.dataSource[0].push(newdata);
        chartRef.current.notifyInsertItem(
            chartRef.current.dataSource[0],
            chartRef.current.dataSource[0].length - 1,
            newdata
        );
    };

    const getDataAndUpdateChart = (
        startOfRangeMillis,
        endOfRangeMillis,
        interval
    ) => {
        fetch(
            `https://api.binance.com/api/v3/uiKlines?symbol=${Symbol}&interval=${interval}&startTime=${startOfRangeMillis}&endTime=${endOfRangeMillis}&limit=1000`
        )
            .then(res => res.json())
            .then(data => {
                let newdata = [];

                console.log(data);

                data.forEach(item => {
                    newdata = [
                        ...newdata,
                        {
                            date: new Date(item[0]),
                            open: parseFloat(item[1]),
                            high: parseFloat(item[2]),
                            low: parseFloat(item[3]),
                            close: parseFloat(item[4]),
                            volume: parseFloat(item[5])
                        }
                    ];
                });
                console.log("week data : ", newdata);

                chartRef.current.dataSource = newdata;
                // chartRef.current.notifyInsertItem(
                //     chartRef.current.dataSource,
                //     0,
                //     newdata
                // );
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleClick = target => {
        switch (target) {
            case 0:
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - 6
                    ).getTime(),
                    new Date().getTime(),
                    "15m"
                );
                startWebSocketData();
                break;

            case 1:
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - 6
                    ).getTime(),
                    new Date().getTime(),
                    "1m"
                );
                break;

            case 2:
                stopWebSocketData();
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - 6
                    ).getTime(),
                    new Date().getTime(),
                    "15m"
                );
                break;

            case 3:
                stopWebSocketData();
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() - 29
                    ).getTime(),
                    new Date().getTime(),
                    "1h"
                );
                break;

            case 4:
                stopWebSocketData();
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear(),
                        now.getMonth() - 5,
                        now.getDate()
                    ).getTime(),
                    new Date().getTime(),
                    "1h"
                );
                break;

            case 5:
                stopWebSocketData();
                getDataAndUpdateChart(
                    new Date(
                        now.getFullYear() - 1,
                        now.getMonth(),
                        now.getDate()
                    ).getTime(),
                    new Date().getTime(),
                    "1d"
                );
                break;

            case 6:
                chartRef.current.chartType = "Line";
                // console.log(chartType);
                break;

            default:
                break;
        }
    };

    // function CustomTooltip(props) {
    //     const { item } = props;

    //     return (
    //         <div style={{ backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>
    //             <div>Date: {item.date.toLocaleDateString()}</div>
    //             <div>Open: {item.open}</div>
    //             <div>High: {item.high}</div>
    //             <div>Low: {item.low}</div>
    //             <div>Close: {item.close}</div>
    //         </div>
    //     );
    // }

    return (
        <div className="container">
            <div className="container" style={{ height: "500px", width: "800px" }}>
                <IgrFinancialChart
                    ref={chartRef}
                    // tooltipTemplate={CustomTooltip}
                    toolTipType="data"
                    xAxisAutoScale={false}
                    xAxisMod="time"
                    // xAxisMinimumValue={today}
                    // xAxisMaximumValue={endOfDay}
                    xAxisLabelVisibility="collapsed"
                    width="100%"
                    height="100%"
                    isToolbarVisible={false}
                    chartType={"Candle"}
                    chartTitle="Crypto Trades"
                    titleAlignment="Left"
                    titleLeftMargin="25"
                    titleTopMargin="10"
                    titleBottomMargin="10"
                    subtitle="Binance - CryptoCoin Price, Currency in USD"
                    subtitleAlignment="Left"
                    subtitleLeftMargin="25"
                    subtitleTopMargin="5"
                    subtitleBottomMargin="10"
                    yAxisMode="Numeric"
                    yAxisVisibility={false}
                    yAxisLabelVisibility="collapsed"
                    finalValueAnnotationsVisible={false}
                    zoomSliderType="None"
                    dataSource={testData}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 30
                }}
            >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(0)} >Live</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(1)} >1D</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(2)} >1W</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(3)} >1M</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(4)} >6M</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(5)} >1Y</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(6)} >Line</button>
            </div>
        </div>
    );
};

export default Chart;
