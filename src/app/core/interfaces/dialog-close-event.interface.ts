import { DialogCloseType } from '../types';

export interface IDialogCloseEvent<R> {
  type: DialogCloseType;
  data: R;
}
