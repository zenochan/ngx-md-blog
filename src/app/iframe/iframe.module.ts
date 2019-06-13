import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {IframeComponent} from './iframe.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [IframeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: IframeComponent}]),
    MatCardModule
  ]
})
export class IframeModule {
}
