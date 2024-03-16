export type JobListings = {
  id: number;
  url: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  positionTitle: string;
  location: string;
  createdAt: Date;
  updatedAt: Date | null;
  applied: Date | null;
  interview: Date | null;
  offer: Date | null;
  screen: Date | null;
};

export type ModalFormData = {
  id?: number;
  url: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  positionTitle: string;
  location: string;
  applied?: Date | null;
  interview?: Date | null;
  offer?: Date | null;
  screen?: Date | null;
};
