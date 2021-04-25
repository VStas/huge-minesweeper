const isNumber = (value: string) => /^\d+$/.test(value);

const min = (minValue: number) => (value: string) => +value >= minValue;
const max = (maxValue: number) => (value: string) => +value <= maxValue;

export interface FormValues {
    width: string;
    height: string;
    bombs: string;
}

type ValidationFunction = (value: string, values: FormValues) => boolean;

const validationRules: Record<keyof FormValues, ValidationFunction[]> = {
    width: [isNumber, min(1), max(10000)],
    height: [isNumber, min(1), max(10000)],
    bombs: [isNumber, min(1), (value, {width, height}) => max(Number(width) * Number(height) - 1)(value)]
};

export type ValidationErrors = Record<keyof FormValues, string>;

const validationErrors: ValidationErrors = {
    width: 'Number from 1 to 10000',
    height: 'Number from 1 to 10000',
    bombs: 'Number from 1 to (cells - 1)'
};

export const validate = (values: FormValues): ValidationErrors => {
    return (Object.keys(values) as (keyof FormValues)[])
        .reduce((errors, fieldName) => {
            const hasError = validationRules[fieldName].some(rule => !rule(values[fieldName], values));
            if (hasError) {
                errors[fieldName] = validationErrors[fieldName];
            }
            return errors;
        }, {} as ValidationErrors);
}