export interface Translation {
  ru: string;
  ua: string;
  en: string;
}

export interface TestTemplatesInterface {
  code: string;
  title: Translation;
  description?: Translation;
  unit?: Translation;
  refValue?: {
    min: string;
    max: string;
  };
}
