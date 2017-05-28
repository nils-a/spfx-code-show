declare interface IAddSomeCodeStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'addSomeCodeStrings' {
  const strings: IAddSomeCodeStrings;
  export = strings;
}
