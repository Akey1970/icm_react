import React, { Component } from 'react';
//import CanvasJSReact from '@canvasjs/react-charts';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// var CanvasJS = CanvasJSReact.CanvasJS;
//  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const PieChart=()=>{
	
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Server Traffic"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Show Report" },
					{ y: 49, label: "Download Report" },
					{ y: 9, label: "Login Report" },
					{ y: 5, label: "SchemeAnalysis Report" },
					{ y: 19, label: "Report" }
				]
			}]
		}
		return (
		<div>
			{/* <CanvasJSChart options = {options}/> */}
			
        </div>
		);
	
}
export default PieChart;                     