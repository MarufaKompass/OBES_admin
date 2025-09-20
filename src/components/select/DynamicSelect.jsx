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
    registerProps.onChange && registerProps.onChange(e);  
    externalOnChange && externalOnChange(e);          
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
          <option key={index} value={value}  className="bg-place text-mainHeading font-semibold font-roboto ">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
