import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { InputNumericDirective } from './directives/input-numeric.directive';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    OrderModule,
    AgGridModule.withComponents([]),
    FormsModule
  ],
  declarations: [InputNumericDirective],
  providers: [],
  exports: [
    OrderModule,
    NgxPaginationModule,
    FormsModule,
    InputNumericDirective,
    AgGridModule
  ]
})
export class SharedModule {}
