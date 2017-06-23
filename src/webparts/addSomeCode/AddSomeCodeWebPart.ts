/// <reference path="../../../node_modules/@types/highlight.js/index.d.ts" />

import {
  Version,
  DisplayMode
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AddSomeCode.module.scss';
import * as strings from 'addSomeCodeStrings';
import { IAddSomeCodeWebPartProps } from './IAddSomeCodeWebPartProps';
import * as hljs from 'highlight.js';

export default class AddSomeCodeWebPart extends BaseClientSideWebPart<IAddSomeCodeWebPartProps> {

  private readContainer: HTMLElement;
  private editContainer: HTMLTextAreaElement;

  private getPossibleLanguages(): IPropertyPaneDropdownOption[] {
    var options: IPropertyPaneDropdownOption[] = [];
    options.push({
      key: '',
      text: 'Auto',
      index: 0
    });
    hljs.listLanguages().map(l => {
      options.push({
        key: l,
        text: l
      });
    });
    return options;
  };

  private renderRead(): void {
    if(!!this.editContainer) {
      this.domElement.removeChild(this.editContainer);
      this.editContainer = null;
    }

    if (!this.readContainer) {
      this.readContainer = document.createElement("div");
      this.readContainer.classList.add(styles.container);
      this.domElement.appendChild(this.readContainer);
    }
    this.readContainer.innerHTML = `<pre class="${styles.formatted} ${this.properties.language}"><code>${escape(this.properties.code)}</code></pre>`;
    hljs.highlightBlock(this.readContainer.firstChild);
  }

  private renderEdit(): void {
    if(!!this.readContainer) {
      this.domElement.removeChild(this.readContainer);
      this.readContainer = null;
    }

    if (!this.editContainer) {
      this.editContainer = document.createElement("textarea");
      this.editContainer.style.width = "100%";
      var lines = (this.properties.code || "").split("\n").length;
      if (lines < 5) { lines = 5; }
      this.editContainer.style.height = (2 * lines) + "em";
      this.editContainer.value = this.properties.code || "";
      this.editContainer.addEventListener("input", () => {
        this.properties.code = this.editContainer.value;
      });
      this.domElement.appendChild(this.editContainer);
    }
  }

  public render(): void {
    if (this.displayMode == DisplayMode.Read) {
      this.renderRead();
    } else {
      this.renderEdit();
    }
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
                PropertyPaneDropdown('language', {
                  label: strings.LanguageFieldLabel,
                  selectedKey: 'Auto',
                  options: this.getPossibleLanguages()
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
