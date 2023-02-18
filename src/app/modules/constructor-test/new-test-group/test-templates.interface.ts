export interface TestGroupTemplatesInterface {
  name: string;
  description?: string;
  tests: { typeId: string }[];
}
