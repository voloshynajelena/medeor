export interface TestTemplatesInterface {
  code: string;
  title: string;
  description?: string;
  unit?: string;
  refValue?: {
    min: string;
    max: string;
  };
}
