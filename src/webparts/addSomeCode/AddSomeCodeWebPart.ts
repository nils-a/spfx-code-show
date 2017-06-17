import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AddSomeCode.module.scss';
import * as strings from 'addSomeCodeStrings';
import { IAddSomeCodeWebPartProps } from './IAddSomeCodeWebPartProps';

export default class AddSomeCodeWebPart extends BaseClientSideWebPart<IAddSomeCodeWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.container}">
      <pre class="${styles.formatted}">${escape(this.properties.code)}</pre>
    </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneFirstPageHeader
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('code', {
                  label: strings.CodeFieldLabel,
                  multiline: true,
                  resizable: true,
                  placeholder: 'add some code...'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
