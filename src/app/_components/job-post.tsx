import Image from "next/image";
import { svgFiles } from "@/lib/svg-loader";
import { Fragment, useContext, useEffect } from "react";
import { GlobalStateContext } from "../context/GlobalStateProvider";
import { useSession } from "next-auth/react";

export default function JobPost(): JSX.Element {
  const status: string[] = ["Applied", "Screen", "Interview", "Offer"];
  const currIdx = 2;
  const {
    jobListings,
    loadJobListings,
    setModalFormData,
    setShowAddModal,
    setEditModal,
  } = useContext(GlobalStateContext);

  const { data: session } = useSession();

  const deleteJobListing = (id: number): void => {
    fetch("/api/listings", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then(async () => {
        await loadJobListings();
      })
      .catch((err) => console.error(err));
  };

  useEffect((): void => {
    if (session) loadJobListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5 justify-center items-center">
      {jobListings.map((jobListing) => (
        <div
          key={jobListing.id}
          className="block p-4 mb-4 rounded-md bg-white hover:shadow shadow-md"
        >
          <div className="flex w-full flex-1 items-center md:flex-grow">
            <div className="w-1/4 flex shrink-0 items-center justify-center">
              {svgFiles[jobListing.companyName] ? (
                <div className="rounded-md shrink-0">
                  {svgFiles[jobListing.companyName]({
                    width: 70,
                    height: 70,
                  })}
                </div>
              ) : (
                <Image
                  className="rounded-md"
                  src="https://source.unsplash.com/blue-and-white-letter-b-9Zjd7PE_FRM"
                  width={90}
                  height={90}
                  alt=""
                />
              )}
              <div className="ml-4 w-full truncate md:min-w-3xs md:max-w-3xs lg:min-w-xs lg:max-w-xs xl:min-w-lg xl:max-w-lg">
                <p className="text-xl font-bold truncate">
                  {jobListing.positionTitle}
                </p>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8"></path>
                    <line x1="13" y1="7" x2="13" y2="7.01"></line>
                    <line x1="17" y1="7" x2="17" y2="7.01"></line>
                    <line x1="17" y1="11" x2="17" y2="11.01"></line>
                    <line x1="17" y1="15" x2="17" y2="15.01"></line>
                  </svg>
                  <p className="text-base ml-1 truncate">
                    {jobListing.companyName}
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="11" r="3"></circle>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                  <p className="text-base ml-1 truncate">
                    {jobListing.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-3/4 flex justify-end items-center">
              <div className="w-full flex-1 items-center md:mr-0 lg:ml-8">
                <div className="flex grow">
                  {status.map((currStatus, idx) => (
                    <Fragment key={idx}>
                      <div className="z-10 flex shrink-0 flex-col items-center">
                        <div className="mb-2 text-xs">{currStatus}</div>
                        <div
                          className={`${
                            idx <= currIdx
                              ? "bg-customLogoColor-600"
                              : "bg-customLogoColor-100"
                          } mx-auto flex h-6 w-6 items-center rounded-full text-lg text-white`}
                        >
                          <span className="w-full text-center">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 16 16"
                              className="w-full fill-current"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {idx > currIdx && (
                                <circle cx="8" cy="8" r="8"></circle>
                              )}
                            </svg>
                          </span>
                        </div>
                        <div className="mt-2 h-4 text-xs">2/8/24</div>
                      </div>
                      {idx !== status.length - 1 && (
                        <div className="flex grow content-center items-center align-middle">
                          <div
                            className={`-mx-4 w-full flex-1 items-center rounded ${
                              idx < currIdx
                                ? "bg-customLogoColor-600"
                                : "bg-customLogoColor-100"
                            } align-middle`}
                          >
                            <div
                              className={`${
                                idx < currIdx
                                  ? "bg-customLogoColor-600"
                                  : "bg-customLogoColor-100"
                              } rounded py-0.5 text-center text-xs leading-none`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
              <button className="bg-white text-green-500 border-2 border-green-500 font-bold rounded h-12 mx-8">
                <span className="px-4">Open</span>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mr-1 hover:text-yellow-500 cursor-pointer"
                onClick={() => {
                  setEditModal(true);
                  setModalFormData({
                    id: jobListing.id,
                    url: jobListing.url,
                    jobType: jobListing.jobType,
                    companyName: jobListing.companyName,
                    location: jobListing.location,
                    applicationStatus: jobListing.applicationStatus,
                    positionTitle: jobListing.positionTitle,
                  });
                  setShowAddModal(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mr-1 hover:text-red-500 cursor-pointer"
                onClick={() => deleteJobListing(jobListing.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
