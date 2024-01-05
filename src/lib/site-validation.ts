export const validateSite = (site: string, companyName: string): boolean => {
  if (site.toLowerCase().includes(companyName.toLowerCase())) return false;

  const websiteRegex = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return websiteRegex.test(site);
};
