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
  doctorId: string;
  id: string;
  name: string;
  surname: string;
  sex: string;
  age: string;
  pregnancy: string;
  phone: string;
  email: string;
  birthday: string;
  photo?: string;
  analyzes?: Analyzes[];
  tags?: any[];
}
export interface ClientDataInput {
  id: string;
  name?: string;
  surname?: string;
  sex?: string;
  age?: string;
  pregnancy?: string;
  phone?: string;
  email?: string;
  tags?: string[];
}

export interface Analyzes {
  id: string;
  name: string;
  code: string;
  date: string;
  category: string;
  groups: string[];
}
export interface Test {
  id: string;
  name: string;
  date: Date;
  marked?: boolean;
  conclusion?: string;
}

export interface Response {
  error: string;
}
