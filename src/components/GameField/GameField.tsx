import React from 'react';

// import {field} from '../../store/GameField';

// export {field};

export const GameField: React.FC = () => {
    return (
        <div className="Field">
            {Array(10000).fill(undefined).map((v, i) => (
                <div key={i} />
            ))}
        </div>
    );
}

