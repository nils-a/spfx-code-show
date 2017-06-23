/// <reference path="../../../node_modules/@types/highlight.js/index.d.ts" />

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
import * as hljs from 'highlight.js';

export default class AddSomeCodeWebPart extends BaseClientSideWebPart<IAddSomeCodeWebPartProps> {

  public container:HTMLElement;

  public render(): void {
    if(!this.container) {
      this.container = document.createElement("div");
      this.container.classList.add(styles.container);
      this.domElement.appendChild(this.container);
    }
    this.container.innerHTML = `<pre class="${styles.formatted}"><code>${escape(this.properties.code)}</code></pre>`;
    hljs.highlightBlock(this.container.firstChild);
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
