export interface User {
  id?: string;
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
  birthday?: string;
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

export interface Test extends ITest {
  date: Date;
  name?: string;
  marked?: boolean;
  conclusion?: string;
}

export interface Response {
  error: string;
}

export interface ITest {
  typeId?: string;
  id: string;
  code?: string;
  value?: string;
  refValue?: IRefValue;
  title?: string;
  description?: string;
  unit?: string;
}

interface IRefValue {
  max: string;
  min: string;
  specialRefs: { [name: string]: IRefValue };
}

export interface ITestsGroup {
  typeId: string;
  id: string;
  date: string;
  clientId?: string;
  doctorId?: string;
  name?: string;
  description?: string;
  tests: ITest[];
  error?: IErrorMessage;
}

export interface IErrorMessage {
  error: string;
}
