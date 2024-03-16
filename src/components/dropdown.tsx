import { GlobalStateContext } from "@/app/context/GlobalStateProvider";
import React, { useRef } from "react";
import { useEffect, useState } from "react";

interface IDropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  children?: React.ReactNode;
  arrayList: Array<any>;
  placeholder?: string;
  selectedItem: string;
  handleEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Dropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(
  (
    {
      name,
      children,
      arrayList,
      placeholder,
      selectedItem,
      handleEvent,
      ...props
    },
    ref
  ) => {
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutsideDropdown = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToggleDropdown(false);
      }
    };

    useEffect(() => {
      if (toggleDropdown) {
        document.addEventListener("click", handleClickOutsideDropdown);

        return () =>
          document.removeEventListener("click", handleClickOutsideDropdown);
      }
    }, [toggleDropdown]);

    return (
      <div className="w-full relative" ref={ref}>
        <button
          {...props}
          type="button"
          className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-primary-base"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setToggleDropdown(!toggleDropdown)}
        >
          <p
            className={`w-full text-left ${
              selectedItem ? "text-black" : "text-gray-400"
            } font-medium`}
          >
            {selectedItem || placeholder}
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
            className="w-full max-h-64 absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            ref={dropdownRef}
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
                    name={name}
                    value={item}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      handleEvent(e);
                      setToggleDropdown(false);
                    }}
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
);

Dropdown.displayName = "Dropdown";
export default Dropdown;
