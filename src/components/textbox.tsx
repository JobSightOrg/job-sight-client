import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: string | null;
  children?: React.ReactNode;
}

const TextBox = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, children, labelText, type = "text", error, ...props }, ref) => (
    <div className={className + " relative"}>
      {labelText && (
        <label
          className="block text-gray-600 font-bold mb-2 text-xs lg:text-sm xl:text-base"
          htmlFor="txt"
        >
          {labelText}
        </label>
      )}
      <div className="relative items-stretch">
        <input
          autoComplete="off"
          className={`rounded-lg border border-gray-400 disabled:border-gray-100 w-full block outline-none py-2 px-2 transition-all text-xs lg:text-sm xl:text-base  bg-gray-50 focus:shadow focus:shadow-green-500
              ${error && "border-red-500 border animate-shake"} ${
            children && "pl-10"
          }`}
          {...props}
          ref={ref}
          type={type}
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
