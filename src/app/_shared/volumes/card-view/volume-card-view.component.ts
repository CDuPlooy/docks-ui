import { Component, OnInit } from '@angular/core';
import {MockService, ServicesService, VolumeService} from '../../../_services';
import {Formatter} from '../../../_classes';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Service, Task, Volume} from '../../../_models';

@Component({
  selector: 'app-volume-card-view',
  templateUrl: './volume-card-view.component.html',
  styleUrls: ['./volume-card-view.component.css']
})
export class VolumeCardViewComponent implements OnInit {

  constructor(private service: VolumeService, private mock: MockService, private modal: NgbModal) { }

  public volumes: Volume[] = [];
  public modalObject: Volume;
  public modalObjectTasks: Volume[];

  ngOnInit() {
      this.service.getVolumes().subscribe((volume) => {
          for (let i = 0; i < volume.length; i++) {
              this.volumes.push(volume[i]);
          }
      });
      this.modalObjectTasks = [];
  }

  public loadModal(content, volume) {
      this.service.getVolumes().subscribe( (volumes) => {
          for (let i = 0; i < volumes.length; i++) {
              if (volumes[i].Name === volume.Name) {
                  console.log(volumes[i]);
                  this.modalObjectTasks.push(volumes[i]);
              }
          }
      });
      this.modalObject = volume;
      this.modal.open(content, { size: 'lg' });
  }
}
