export const getAge = (dob: string): number => {
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) {
    throw new Error('Invalid date string');
  }
  return new Date().getFullYear() - dobDate.getFullYear();
};
