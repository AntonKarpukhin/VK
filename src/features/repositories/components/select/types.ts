interface Option {
    value: string;
    label: string;
}

export interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    id?: string;
}