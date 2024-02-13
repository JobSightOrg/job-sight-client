import { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateProvider";

export default function JobSearch(): JSX.Element {
  const { setShowAddModal, jobListings } = useContext(GlobalStateContext);

  return (
    <div className="block h-full">
      <div className="m-auto flex h-full max-w-8xl flex-col sm:pt-10 ">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4">
          Your Job Tracker List
        </h1>
        <div className="h-full xl:flex xl:items-baseline mb-4">
          <h2 className="text-base font-semibold uppercase text-gray-500">
            {jobListings.length} total jobs tracked
          </h2>
          <div className="mt-4 flex justify-between xl:ml-10 xl:mt-0 xl:block">
            <nav className="mb-px flex space-x-8">
              <button
                className="border-primary-dark text-primary-darkest whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm focus:outline-none"
                type="button"
              >
                Active
              </button>
              <button
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm focus:outline-none"
                type="button"
              >
                Archived
              </button>
            </nav>
            {/* <div className="ml-auto xl:hidden">
              <button
                className="inline-flex w-max items-center justify-center rounded-sm border border-transparent bg-primary-darkest p-2 text-sm font-medium leading-4 text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none"
                type="button"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                </svg>
              </button>
              <button
                className="ml-2 inline-flex w-max items-center justify-center rounded-sm border border-transparent bg-primary-darkest p-2 text-sm font-medium leading-4 text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none"
                type="button"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
                  <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
                </svg>
              </button>
              <button
                className="ml-2 inline-flex w-max items-center justify-center rounded-sm border border-transparent bg-primary-darkest p-2 text-sm font-medium leading-4 text-white shadow-sm transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none"
                type="button"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"></path>
                </svg>
              </button>
            </div> */}
          </div>
          <div className="ml-auto hidden items-center xl:flex">
            <button
              className="w-40 h-15 mr-2 px-3 py-2 inline-flex items-center justify-center overflow-hidden text-white text-xl font-semibold bg-customLogoColor-500 hover:bg-customLogoColor-800 shadow-sm transition duration-150 ease-in-out rounded-sm cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="h-full">Add job</span>
            </button>
            <button className="w-48 h-15 px-3 py-2 inline-flex items-center justify-center overflow-hidden text-white text-xl font-semibold bg-customLogoColor-500 hover:bg-customLogoColor-800 shadow-sm transition duration-150 ease-in-out rounded-sm cursor-pointer">
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                strokeWidth="0"
                fill="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span className="h-full">Download</span>
            </button>
          </div>
        </div>
        <form className="w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Company"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
