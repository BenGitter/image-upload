import { UploadService } from './../upload.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  percentageDone: number = 0;

  constructor(public uploadService:UploadService) { }

  ngOnInit() {
    this.uploadService.uploadProgressEvent
      .subscribe(percentage => {
        this.percentageDone = percentage;
    });
  }

}
