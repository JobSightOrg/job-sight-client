import { useState } from "react";

export interface IDropdownProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  toggleCurrentDropDown: boolean;
  arrayList: Array<any>;
  placeholder: string;
}

export default function Dropdown({
  children,
  toggleCurrentDropDown,
  arrayList,
  placeholder,
  ...props
}: IDropdownProps) {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(
    toggleCurrentDropDown
  );
  const [selectedItem, setSelectedItem] = useState<string>(placeholder);

  return (
    <div className="w-full relative">
      <button
        {...props}
        type="button"
        className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => setToggleDropdown(!toggleDropdown)}
      >
        <p className="w-full text-left text-gray-400 font-medium">
          {selectedItem}
        </p>
        <span className="self-stretch w-[1px] bg-gray-400 box-border"></span>
        <svg
          className="-mr-1 h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {toggleDropdown && (
        <div
          className="w-full absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {children ? (
            children
          ) : (
            <>
              {arrayList.map((item, idx) => (
                <button
                  className="w-full text-gray-700 block px-4 py-2 text-sm rounded-md text-left hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={-1}
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                >
                  {item}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
