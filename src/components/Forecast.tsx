import React from 'react';
import {forecastType} from "../types";
import {Degree} from "./Degree";

type Props = {
    data: forecastType
}

const Forecast = ({data}: Props) => {

    const today = data.list[0]

    return (
        <div
            className="w-full md:max-w-[650px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2xl font-black">{data.name}
                        <span className="font-thin"> {data.country}</span>
                    </h2>
                    <h1 className="text-4xl font-extrabold"><Degree temp={Math.round(today.main.temp)}/></h1>
                </section>
                <p className="text-center text-sm">{today.weather[0].main} {today.weather[0].description}</p>
                <p className="text-sm text-center py-5">
                    H: <Degree temp={today.main.temp_max}/> L: <Degree temp={today.main.temp_min}/>
                </p>
            </div>
        </div>
    );
};

export default Forecast;
