import { JobListings } from "../page";

type Props = {
  jobListings: JobListings[];
};

export default function JobPost({ jobListings }: Props): JSX.Element {
  return (
    <div className="mt-5">
      {jobListings.map((jobListing) => (
        <div
          key={jobListing.id}
          className="select-none cursor-pointer border-2 border-black rounded-md flex flex-1 items-center p-4 hover:shadow mb-4"
        >
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">{jobListing.companyName}</div>
            <div className="text-gray-600 text-sm">
              {" "}
              <a
                className="inline-block rounded-full text-white
                            bg-yellow-700
                            text-xs font-bold
                            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
                target="_blank"
              >
                COMPA
              </a>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
