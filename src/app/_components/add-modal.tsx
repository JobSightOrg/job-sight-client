import Modal from "@/components/modal";
import { Props } from "@/components/modal";
import React, { useEffect, useState } from "react";

enum Company {
  Google = "Google",
  Meta = "Meta",
  Amazon = "Amazon",
  Apple = "Apple",
}

export default function AddModal({ isVisible, onClose }: Props): JSX.Element {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("Company");
  const [urlInput, setUrlInput] = useState<string>("");

  const resetState = (): void => {
    setToggleDropdown(false);
    setSelectedCompany("Company");
  };

  const postAddJob = () => {
    fetch("/api/listing", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ companyName: selectedCompany, url: urlInput }),
    })
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  useEffect(() => resetState(), [onClose]);

  return (
    <Modal isVisible={isVisible} title={"Add Job Listing"} onClose={onClose}>
      <div className="flex items-stretch mt-2">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            >
              {selectedCompany}
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
          </div>
          {toggleDropdown && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              {(Object.keys(Company) as Array<keyof typeof Company>).map(
                (company, idx) => (
                  <div
                    className="py-1"
                    role="none"
                    key={idx}
                    onClick={() => {
                      setSelectedCompany(company);
                      setToggleDropdown(false);
                    }}
                  >
                    <button
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      {company}
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="relative w-full">
          <div className="absolute text-gray-500 flex items-center px-2 border-r h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-link"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
            </svg>
          </div>
          <input
            id="link"
            className="pr-24 text-gray-600 bg-gray-100 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-12 text-sm border-gray-300 rounded border"
            placeholder="https://google.com"
            value={urlInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setUrlInput((e.target as HTMLInputElement)?.value)
            }
          />
          <button
            className="focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-indigo-600 absolute right-0 top-0 transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none bg-indigo-700 rounded-r text-white px-5 h-10 text-sm"
            onClick={() => postAddJob()}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
