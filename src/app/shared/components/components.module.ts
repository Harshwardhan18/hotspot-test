import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalModule} from './confirmation-modal/confirmation-modal.module';
import {LinearLoaderModule} from './linear-loader/linear-loader.module';
import {ToastComponent} from './toast/toast.component';


@NgModule({
  declarations: [
    ActionButtonComponent,
    ActionModalComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModalModule,
    LinearLoaderModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ToastComponent,
    LinearLoaderModule
  ]
})
export class ComponentsModule {
}
