import React from "react";

interface ITextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string | null;
  children?: React.ReactNode;
}

const TextBox = React.forwardRef<HTMLInputElement, ITextBoxProps>(
  (
    { className, children, labelText, type = "text", error, ...props },
    ref
  ): JSX.Element => (
    <div className={className + " relative"}>
      {labelText && (
        <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
          {labelText}
        </label>
      )}
      <div className="relative items-stretch">
        <input
          autoComplete="off"
          className={`rounded-lg border border-gray-400 disabled:border-gray-100 w-full block outline-none py-2 px-2 transition-all text-xs lg:text-sm xl:text-base bg-gray-50 focus:shadow focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-lightest
              ${error && "border-red-500 border animate-shake"} ${
            children && "pl-10"
          }`}
          ref={ref}
          type={type}
          {...props}
        />
        {children}
      </div>
      {error && (
        <p className="text-red-600 text-left animate-shake pl-2">{error}</p>
      )}
    </div>
  )
);

TextBox.displayName = "TextBox";
export default TextBox;
