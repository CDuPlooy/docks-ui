import { TestBed, inject } from '@angular/core/testing';

import {ServicesService, ConfigurationService, MockService} from '../../../_services';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenStorage } from '../../../_classes';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiceListViewComponent } from '../list-view/service-list-view.component';

describe('ServicesListViewComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(), HttpClientModule, RouterTestingModule, NgxDatatableModule
            ],
            providers: [ConfigurationService, ServicesService, MockService, TokenStorage],
        });
    });

    it('should be created', inject([ServicesService], (service: ServicesService) => {
        expect(service).toBeTruthy();
    }));
});
