import { Component, OnInit, TemplateRef, Type } from '@angular/core';

import { DialogTypeEnum } from '../../enums';
import { DialogType } from '../../types';
import { DialogRef } from './dialog-ref';

@Component({
  templateUrl: './dialog-wrapper.component.html',
})
export class DialogWrapperComponent implements OnInit {

  public contentType: DialogTypeEnum;
  public content: DialogType;
  public context: any;

  public dialogType = DialogTypeEnum;

  constructor(
    private readonly _dialogRef: DialogRef,
  ) {}

  public ngOnInit(): void {
    this._initDialogType();
  }

  public close(): void {
    this._dialogRef.close(null);
  }

  private _initDialogType(): void {
    this.content = this._dialogRef.content;

    if (typeof this.content === 'string') {
      this.contentType = DialogTypeEnum.string;
    } else if (this.content instanceof TemplateRef) {
      this.contentType = DialogTypeEnum.template;
      this.context = {
        close: this._dialogRef.close.bind(this._dialogRef)
      };
    } else {
      this.contentType = DialogTypeEnum.component;
    }
  }


}
