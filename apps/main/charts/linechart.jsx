import { Line } from "react-chartjs-2";

function LineChart({options,data}){

    return <Line data={data} options={options}></Line>
}


export default LineChart;