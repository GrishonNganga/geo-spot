import { cn } from '@/lib/utils';
import React, { KeyboardEventHandler } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

interface Select {
    Option: unknown,
    IsMulti: false,
}
export interface SelectProps extends Select, React.InputHTMLAttributes<HTMLInputElement> {
    inputValue: string,
    setInputValue: (val: string) => void
    value: readonly string[]
    setValue: (prevVal: string[]) => void
}



const createOption = (label: string) => ({
    label,
    value: label,
});

const MultiSelect = React.forwardRef<Element, SelectProps>(
    ({ className, inputValue, setInputValue, value, setValue, ...props }) => {
        const handleKeyDown: KeyboardEventHandler = (event) => {
            if (!inputValue) return;
            switch (event.key) {
                case 'Enter':
                case 'Tab':
                    setValue((prev) => [...prev, createOption(inputValue)]);
                    setInputValue('');
                    event.preventDefault();
            }
        };

        return (
            <CreatableSelect
                className={cn(className)}
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                {...props}
            />
        );
    }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }