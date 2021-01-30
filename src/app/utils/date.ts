export const getAge = (dob: string): number => {
    const dobDate = new Date(dob).getFullYear();
    const nowDate = new Date().getFullYear();
    return nowDate - dobDate;
  }