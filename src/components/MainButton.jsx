import React from "react";

export default function MainButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}) {

  const baseClasses =
    "flex items-center justify-center font-heading font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";


  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary/90 focus:ring-primary ",
    secondary:
      "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    outlined:
      "border border-accent text-accent hover:bg-primary/10 focus:ring-primary",
  };

  // Sizes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm font-medium ",
    md: "px-5 py-3 text-sm font-medium",
    lg: "px-7 py-3 text-sm font-medium",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
