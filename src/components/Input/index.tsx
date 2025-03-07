import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'
import { Container, Error } from './styles';

// import Tooltip from '../Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleOnFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleOnBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);
    return (
        <Container  isErrored={!!error} isFilled={isFilled} isFocused={isFocused} >
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
            {error && (
                <Error title={error}>
                    
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    )

}
export default Input;