import { UploadService } from './../upload.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  percentageDone: number = 0;
  fadeOut: boolean = false;

  constructor(public uploadService:UploadService) { }

  ngOnInit() {
    this.uploadService.uploadProgressEvent
      .subscribe(percentage => {
        this.percentageDone = percentage;

        if(percentage === 101 && !this.uploadService.errorState){
          setTimeout(() => {
            this.fadeOut = true;
          }, 500);
          setTimeout(() => {
            this.percentageDone = 0;
          }, 1000);
        }else{
          this.fadeOut = false;
        }
    });
  }

}
