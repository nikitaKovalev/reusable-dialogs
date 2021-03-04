import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '@core/services';
import { IDialogCloseEvent, IDialogConfig } from '@core/interfaces';

import { ExampleTextComponent } from './example-text/example-text.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  implements OnDestroy {

  @ViewChild('tmp', { static: true })
  private _tmp: TemplateRef<any>;

  private _destroyed$ = new Subject<void>();

  constructor(
    private readonly _dialogService: DialogService,
  ) {}

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public openComponent(): void {
    const dialogConfig: IDialogConfig = {
      width: '600px',
      data: { userName: 'Manskiy' },
    };

    const dialogRef = this._dialogService.open(ExampleTextComponent, dialogConfig);

    dialogRef.afterClosed$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((result: IDialogCloseEvent<any>) => {
        console.log(result.data);
      });
  }

  public openString(): void {
    const dialogConfig: IDialogConfig = {
      width: '600px',
      height: '100px',
      data: null,
    };

    const message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam beatae blanditiis' +
      ' cum cupiditate doloribus eius excepturi ipsam minima molestiae nesciunt obcaecati' +
      ' perspiciatis placeat provident, quas reprehenderit sit suscipit velit. Nesciunt.';

    this._dialogService.open(message, dialogConfig);
  }

  public openTemplate(): void {
    const dialogConfig: IDialogConfig = {
      width: '600px',
      data: null,
    };

    this._dialogService.open(this._tmp, dialogConfig);
  }

}
