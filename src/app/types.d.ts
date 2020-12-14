export interface User {
  id: string;
  email?: string;
  pass?: string;
  name?: string;
  surname?: string;
  phone?: string;
  location?: string;
  specialties?: string;
  photo?: string;
}

export interface Client {
  doctorID: string;
  id: string;
  name: string;
  surname: string;
  sex: string;
  age: string;
  pregnancy: string;
  phone: string;
  email: string;
  photo: string;
  analyzes?: Analyzes[];
}

interface Analyzes {
  id: string;
  name: string;
  code: string;
  date: string;
  category: string;
  groups: string[];
}
