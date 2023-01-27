import React, { useState, useEffect } from 'react'
import { createChart } from 'lightweight-charts';


const Chart = (props) => {
  console.log("Props : ", `${props.cryptoName}@kline_1s`);
  let ws;
  useEffect(() => {
    console.log("in useeffect", !props.cryptoName);
    console.log("ws is : ", ws);
    if (!props.cryptoName && ws) {
      console.log("in if");
      document.getElementById('chart').innerHTML = "";
      ws.close();
    }
    if (props.cryptoName) {
      const ch = createChart(document.getElementById('chart'), {
        width: 400, height: 300, layout: {
          backgroundColor: '#000000',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(20, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(20, 203, 206, 0.5)',
          },
        },
        // crosshair: {
        //   mode: LightweightCharts.CrosshairMode.Normal,
        // },
        priceScale: {
          borderColor: 'rgba(2p, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(20, 203, 206, 0.8)',
          timeVisible: true,
          secondsVisible: false,
        },
      });
      const series = ch.addCandlestickSeries();
      // series.setData(priceData);
      ws = new WebSocket(`wss://stream.binance.com:9443/ws`);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${props.cryptoName}@kline_1s`],
          id: 1,
        }));
      }
      ws.onmessage = (e) => {
        const dataJson = JSON.parse(e.data);
        console.log("DataJson is : ", dataJson);
        series.update({
          time: dataJson.k.t / 1000,
          open: dataJson.k.o,
          high: dataJson.k.h,
          low: dataJson.k.l,
          close: dataJson.k.c
        });
      }
    }
    // Close the connection when the component unmounts
    return () => {
      if (ws) {
        ws.close();
        document.getElementById('chart').innerHTML = "";
      }
    }
  });

  return (
    <div id='chart'></div>
  )
}

export default Chart;

