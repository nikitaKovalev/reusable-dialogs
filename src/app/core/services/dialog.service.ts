import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { IDialogConfig } from '../interfaces';
import { DialogRef, DialogWrapperComponent } from '../components';

@Injectable()
export class DialogService {

  private readonly _positionStrategy = this._overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

  private _overlayRef: OverlayRef = null;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _injector: Injector,
  ) {}

  public open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    config: IDialogConfig,
  ): DialogRef<R> {
    const configs = new OverlayConfig({
      positionStrategy: this._positionStrategy,
      hasBackdrop: true,
      disposeOnNavigation: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: ['modal'], // styles for cdk-overlay
      // backdropClass: 'modal-background', // styles for black background overlay
      width: config?.width || '400px',
      maxHeight: config?.height || '400px',
    });

    if (this._overlayRef) {
      this._overlayRef.detach();
    }

    this._overlayRef = this._overlay.create(configs);

    const myOverlayRef = new DialogRef<R, T>(this._overlayRef, content, config?.data);

    const injector = this._createInjector(myOverlayRef, this._injector);

    this._overlayRef.attach(new ComponentPortal(DialogWrapperComponent, null, injector));

    return myOverlayRef;
  }

  private _createInjector(ref: DialogRef, inj: Injector): PortalInjector {
    const injectorTokens = new WeakMap([[DialogRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

}
