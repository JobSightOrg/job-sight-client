import { useEffect, useState } from "react";

interface JobListings {
  id: number;
  url: string;
  company: string;
  createdAt: Date;
  updatedAt?: Date;
}

export default function JobPost(): JSX.Element {
  const [jobListings, setJobListings] = useState<JobListings[]>([]);

  useEffect(() => {
    fetch("/api/listing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-5">
      {jobListings.map((jobListing) => (
        <div
          key={jobListing.id}
          className="select-none cursor-pointer border-2 border-black rounded-md flex flex-1 items-center p-4 hover:shadow"
        >
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium">{jobListing.company}</div>
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
