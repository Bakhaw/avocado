import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({
    errForm,
    errMsg,
    inputText,
    multiline,
    name,
    onBlur,
    onChange,
    type,
    value,
}) => {
    return (
        <div className='input-container'>
            <TextField className='custom-input'
                error={errForm}
                helperText={errForm ? errMsg : ''}
                InputProps={{ disableUnderline: true }}
                margin='normal'
                multiline={multiline}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={inputText}
                rows='4'
                type={type}
                defaultValue={value}
            />
        </div>
    );
}

export default Input;