import React, {ChangeEvent, useEffect, useState} from 'react';
import {forecastType, optionType} from "../types";
import Forecast from "./Forecast";

const Search = () => {
    const [term, setTerm] = useState<string>('');

    const [options, setOptions] = useState<[]>([]);

    const [city, setCity] = useState<optionType | null>(null)

    const [forecast, setForecast] = useState<forecastType | null>(null)

    const getSearchOptions = (term: string) => {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${term.trim()}&limit=3&appid=f8e3b9b11f7b534c3c28445639dcf776`).then(res => res.json()).then(data => setOptions(data))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value.trim()
        setTerm(value)

        if (value === '') return

        getSearchOptions(value)
    }

    const onSubmit = () => {
        if (!city) return
        getForecast(city)
    }

    const getForecast =
        (city: optionType) => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=f8e3b9b11f7b534c3c28445639dcf776`).then((res => res.json().then((data) => {
                const forecastData = {
                    ...data.city,
                    list: data.list.slice(0, 16)
                }
                setForecast(forecastData)
            })))

        }

    const onOptionSelect = (option: optionType) => {
        setCity(option)

    }

    useEffect(() => {
        if (city) {
            setTerm(city.name)
            setOptions([])

        }
    }, [city])

    return (

        <main
            className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
                <section
                    className="w-full md:max-w-[850px] p-3 flex flex-col text-center items-center justify-center md:px-10 lg:p-15 h-full lg:h-[850px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
                    <h1 className="text-4xl font-thin">Weather <span className="font-black">Forecast</span></h1>
                    <p className="text-sm mt-2 mb-2">Enter below a place you want to know the weather of and select an option
                        from the dropdown</p>
                    <div className=" relative flex mt-7 md:mt-2 mb-12">

                        <input type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white"
                               onChange={onInputChange}/>
                        <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
                            {options.map((option: optionType, index: number) => (<li key={option.name + '-' + index}>
                                <button
                                    className="text-left text-sm w-full  hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                                    onClick={() => onOptionSelect(option)}>{option.name}</button>
                            </li>))}

                        </ul>
                        <button
                            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
                            onClick={onSubmit}>Seacrh
                        </button>
                    </div>
                    {forecast && <Forecast data={forecast}/>}
                </section>


        </main>
    );
};

export {Search};
