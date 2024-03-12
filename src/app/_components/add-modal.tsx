import Image from "next/image";
import Modal from "@/components/modal";
import { svgFiles } from "@/lib/svg-loader";
import React, { useContext, useEffect, useState } from "react";
import { validateSite } from "@/lib/site-validation";
import { GlobalStateContext } from "../context/GlobalStateProvider";
import Dropdown from "@/components/dropdown";
import { useSession } from "next-auth/react";

enum Company {
  Google = "Google",
  Facebook = "Facebook",
  Amazon = "Amazon",
  Apple = "Apple",
  Microsoft = "Microsoft",
}

export default function AddModal(): JSX.Element {
  const [formError, setFormError] = useState<string>("");
  const { data: session } = useSession();

  const {
    loadJobListings,
    company,
    setCompany,
    applicationStatus,
    setApplicationStatus,
    jobType,
    setJobType,
    location,
    setLocation,
    positionTitle,
    setPositionTitle,
    urlInput,
    setUrlInput,
    showAddModal,
    setShowAddModal,
    editModal,
    setEditModal,
  } = useContext(GlobalStateContext);

  const resetState = (): void => {
    setCompany("");
    setApplicationStatus("");
    setJobType("");
    setPositionTitle("");
    setLocation("");
    setUrlInput("");
    setEditModal(false);
  };

  const onClose = (): void => setShowAddModal(false);

  const postJobListing = (): void => {
    const data = {
      email: session?.user?.email,
      companyName: company,
      positionTitle: positionTitle,
      location: location,
      applicationStatus: applicationStatus,
      jobType: jobType,
      url: urlInput,
    };

    fetch("/api/listings", {
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
          {svgFiles[company] ? (
            <div className="mr-4">
              {svgFiles[company]({
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
          <div className="w-full flex-col ml-4">
            <div className="block mb-4">
              <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                Company
              </label>
              <Dropdown
                arrayList={Object.keys(Company) as Array<keyof typeof Company>}
                placeholder="Company"
                selectedItem={company}
                setSelectedItem={setCompany}
              />
            </div>
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
                className="form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                value={positionTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setPositionTitle((e.target as HTMLInputElement)?.value)
                }
              />
            </div>
            <div className="block mb-4">
              <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                Application Status
              </label>
              <Dropdown
                arrayList={["Applied", "Screen", "Interview", "Offer"]}
                placeholder="Status"
                selectedItem={applicationStatus}
                setSelectedItem={setApplicationStatus}
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
                className="form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-lightest disabled:bg-gray-50 disabled:opacity-90 sm:text-sm sm:leading-5"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setLocation((e.target as HTMLInputElement)?.value)
                }
              />
            </div>
            <div className="block mb-4">
              <label className="block text-sm font-medium leading-5 text-gray-700 mb-1">
                Job Type
              </label>
              <Dropdown
                arrayList={["Internship", "Full-Time", "Part-Time"]}
                placeholder="Type"
                selectedItem={jobType}
                setSelectedItem={setJobType}
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
            className="pr-24 text-gray-600 bg-gray-100 focus:outline-none focus:border focus:border-primary-base font-normal w-full h-10 flex items-center pl-12 text-sm border-gray-300 rounded border"
            placeholder="https://google.com"
            value={urlInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setUrlInput((e.target as HTMLInputElement)?.value)
            }
            required
          />
          <button
            className="focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-customLogoColor-600 absolute right-0 top-0 transition duration-150 ease-in-out hover:bg-customLogoColor-800 focus:outline-none bg-customLogoColor-500 rounded-r text-white px-5 h-10 text-sm"
            onClick={() => {
              if (validateSite(urlInput, company)) postJobListing();
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
