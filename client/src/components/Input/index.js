import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ onChange, inputText, errForm, errMsg, name, onBlur, value, type }) => {
        return (
            <div className='input-container'>
                <TextField
                    className='custom-input'
                    InputProps={{ disableUnderline: true }}
                    placeholder={inputText}
                    error={errForm}
                    helperText={errForm ? errMsg : ''}
                    onBlur={onBlur}
                    onChange={onChange}
                    type={type}
                    name={name}
                    value={value}
                />
            </div>
        );
}

export default Input;