import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceListViewComponent } from '../list-view/service-list-view.component';
import { ServicesService } from 'app/_services';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  declarations: [
    ServiceListViewComponent,
  ],
  providers: [ServicesService],
})
export class ServiceListViewModule { }
