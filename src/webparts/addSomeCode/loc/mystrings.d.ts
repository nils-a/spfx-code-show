declare interface IAddSomeCodeStrings {
  PropertyPaneFirstPageHeader: string;
  BasicGroupName: string;
  CodeFieldLabel: string;
  LanguageFieldLabel: string;
}

declare module 'addSomeCodeStrings' {
  const strings: IAddSomeCodeStrings;
  export = strings;
}
