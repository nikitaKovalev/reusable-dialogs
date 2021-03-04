import { Component } from '@angular/core';

import { DialogRef } from '@core/components';

@Component({
  selector: 'app-example-text',
  templateUrl: './example-text.component.html',
})
export class ExampleTextComponent {

  constructor(
    private readonly _dialogRef: DialogRef,
  ) {
    console.log(this._dialogRef.data);
  }

  public close(): void {
    this._dialogRef.close();
  }

  public submit(): void {
    this._dialogRef.close('Here could be your data');
  }

}
