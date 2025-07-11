import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughNut({data,options}){

    return <Doughnut data={data} options={options} />;
}

export default DoughNut;