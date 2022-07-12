export interface Translation {
  ru: string;
  ua: string;
  en: string;
}

export interface TestGroupTemplatesInterface {
  name: Translation;
  description?: Translation;
  tests: { typeId: string }[];
}
