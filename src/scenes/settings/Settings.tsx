import React, { useState } from 'react';
import {validate, ValidationErrors, FormValues} from './validation';

import { cn as createCn } from '@bem-react/classname'

import './Settings.css';

const cn = createCn('settings');

export const Settings: React.FC = () => {
    const [width, setWidth] = useState('9');
    const [height, setHeight] = useState('9');
    const [bombs, setBombs] = useState('10');
    const [validationErrors, setValidationErrors] = useState({} as ValidationErrors);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const values: FormValues = {width, height, bombs};
        const validationErrors = validate(values);
        setValidationErrors(validationErrors);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><label>Width</label></div>
            <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} />
            <div className={cn('error')}>{validationErrors.width}</div>

            <div><label>Height</label></div>
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
            <div className={cn('error')}>{validationErrors.height}</div>

            <div><label>Bombs</label></div>
            <input type="text" value={bombs} onChange={(e) => setBombs(e.target.value)} />
            <div className={cn('error')}>{validationErrors.bombs}</div>

            <input className={cn('submit')} type="submit" value="Let's go!" />
        </form>
    );
};
