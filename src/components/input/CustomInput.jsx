import React from "react";
export default function CustomInput({
    name,
    register,
    label,
    type = "text",
    rules = {},
    errors,
    placeholder = "",
    className = "",
    defaultValue = "",
}) {
    return (
        <input
            {...register(name, rules)}
            type={type}
            placeholder={placeholder || label}
            defaultValue={defaultValue}
            className={`
        w-full px-4 py-3 rounded-lg border border-gray-300 text-sm 
        focus:outline-none focus:ring-1 focus:ring-accent
        ${errors && errors[name] ? "border-red-500" : ""}
        ${className}
      `}
        />
    );
}
