import { Injectable, OnDestroy } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDialogCloseEvent } from '../../interfaces';
import { DialogCloseType, DialogType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class DialogRef<R = any, T = any>
  implements OnDestroy {

  public readonly afterClosed$ = new Subject<IDialogCloseEvent<R>>();

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    public overlay: OverlayRef,
    public content: DialogType,
    public data: T // pass data to modal i.e. FormData
  ) {
    this._subBackdropClick();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public close(data?: R): void {
    this._close('close', data);
  }

  private _close(type: DialogCloseType, data: R): void {
    this.overlay.dispose();

    this.afterClosed$.next({ type, data });
    this.afterClosed$.complete();
  }

  private _subBackdropClick(): void {
    this.overlay.backdropClick()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => this._close('backdropClick', null));
  }

}
