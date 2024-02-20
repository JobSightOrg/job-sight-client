import Image from "next/image";
import Modal from "@/components/modal";
import { svgFiles } from "@/lib/svg-loader";
import React, { useContext, useEffect, useRef, useState } from "react";
import { validateSite } from "@/lib/site-validation";
import { GlobalStateContext } from "../context/GlobalStateProvider";
import Dropdown from "@/components/dropdown";

enum Company {
  Google = "Google",
  Facebook = "Facebook",
  Amazon = "Amazon",
  Apple = "Apple",
  Microsoft = "Microsoft",
}

export default function AddModal(): JSX.Element {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const modalRef = useRef(null);

  const {
    loadJobListings,
    selectedCompany,
    setSelectedCompany,
    urlInput,
    setUrlInput,
    showAddModal,
    setShowAddModal,
    editModal,
    setEditModal,
  } = useContext(GlobalStateContext);

  const resetState = (): void => {
    setToggleDropdown(false);
    setSelectedCompany("Select Company");
    setUrlInput("");
    setEditModal(false);
  };

  const onClose = (): void => setShowAddModal(false);

  const postJobListing = (): void => {
    const data = { companyName: selectedCompany, url: urlInput };

    fetch("/api/listing", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async () => {
        await loadJobListings();
        onClose();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!showAddModal) resetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddModal]);

  return (
    <Modal
      isVisible={showAddModal}
      title={`${editModal ? "Edit" : "Add"} Job Listing`}
      onClose={onClose}
    >
      <div className="flex-col items-stretch p-4">
        <div className="flex mb-4">
          {svgFiles[selectedCompany] ? (
            <div className="mr-4">
              {svgFiles[selectedCompany]({
                width: 120,
                height: 120,
              })}
            </div>
          ) : (
            <Image
              className="rounded-md mr-4"
              src={
                "https://source.unsplash.com/blue-and-white-letter-b-9Zjd7PE_FRM"
              }
              width={120}
              height={120}
              alt=""
            />
          )}
          <div className="w-full flex-col">
            <button
              type="button"
              className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            >
              <p>
                {selectedCompany.length ? selectedCompany : "Select Company"}
              </p>
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
                className="absolute z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
        </div>
        <div className="flex">
          <div className="w-full flex flex-col mr-2">
            <div className="block mb-4">
              <label className=" block items-center text-sm font-medium leading-5 text-gray-700">
                Position Title
              </label>
              <input
                aria-label="Position Title"
                placeholder="Title"
                step="1"
                type="text"
                name="title"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-4 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5 "
              />
            </div>
            <div className="block mb-4">
              <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                Application Status
              </label>
              <Dropdown
                arrayList={["Applied", "Screen", "Interview", "Offer"]}
                placeholder="Status"
              />
            </div>
          </div>
          <div className="w-full flex flex-col ml-2">
            <div className="block mb-4">
              <label className=" block items-center text-sm font-medium leading-5 text-gray-700">
                Location
              </label>
              <input
                aria-label="Location"
                placeholder="Location"
                step="1"
                type="text"
                name="location"
                className="form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-4 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5 "
              />
            </div>
            <div className="block mb-4">
              <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                Application Status
              </label>
              <Dropdown
                arrayList={["applied", "screen", "interview", "offer"]}
                placeholder="Status"
              />
            </div>
          </div>
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
            required
          />
          <button
            className="focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-indigo-600 absolute right-0 top-0 transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none bg-indigo-700 rounded-r text-white px-5 h-10 text-sm"
            onClick={() => {
              if (validateSite(urlInput, selectedCompany)) postJobListing();
              else setFormError("");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
