import Image from "next/image";
import { JobListings } from "../page";

type JobPostProps = {
  jobListings: JobListings[];
};

export default function JobPost({ jobListings }: JobPostProps): JSX.Element {
  return (
    <div className="mt-5">
      {jobListings.map((jobListing) => (
        <div
          key={jobListing.id}
          className="select-none cursor-pointer border-2 border-black rounded-md items-center p-3 hover:shadow mb-4"
        >
          <div className="flex">
            <Image
              className="rounded-md"
              src="https://source.unsplash.com/blue-and-white-letter-b-9Zjd7PE_FRM"
              width={100}
              height={100}
              alt=""
            />
            <div className="ml-2">
              <p className="text-xl font-bold">Full Stack Developer</p>
              <p className="text-base">{jobListing.companyName}</p>
              <p className="text-base">Long Beach, CA</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
