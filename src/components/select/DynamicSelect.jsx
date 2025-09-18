import React from 'react';

export default function DynamicSelect({
  name =  "",
  register,
  options = [],
  rules = {},
  errors,
  defaultValue = '',
  className = '',
  placeholder = '-- Select --',
onChange: externalOnChange,
}) {

  // const registerProps = register && name ? register(name, rules) : {};
   const combinedOnChange = (e) => {
    registerProps.onChange && registerProps.onChange(e);  // call react-hook-form
    externalOnChange && externalOnChange(e);              // call external callback
  };



  return (
    <div className="w-full">
  
      <select
        id={name}
        onChange={combinedOnChange}
        //  onChange={combinedOnChange}
        {...register(name, rules)}
        defaultValue={defaultValue}
        className={`w-full rounded-md border border-gray-300 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-accent ${
          errors && errors[name] ? 'border-accent' : ''
        } ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ value, label }, index) => (
          <option key={index} value={value} >
            {label}
          </option>
        ))}
      </select>

    </div>
  );
}
