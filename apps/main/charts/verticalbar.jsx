import { Bar } from "react-chartjs-2";

function BarCharts({data,options}){

    return <Bar options={options} data={data} />;
}

export default BarCharts;