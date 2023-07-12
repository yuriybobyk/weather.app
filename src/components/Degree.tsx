import React from 'react';

type Props={
    temp:number
}

const Degree = ({temp}:Props) => {
    return (
        <span>
            {temp}
            <sub className="bottom-4">o</sub>
        </span>
    );
};

export {Degree}
