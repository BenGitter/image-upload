import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  filename:string = "";
  showData:boolean = false;
  data:any = {};

  constructor(private uploadService:UploadService) { }

  ngOnInit() {
  }

  onSubmit(e){
    e.preventDefault();
    this.uploadService.submitForm(e).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        const percentDone = Math.round(100* event.loaded / event.total);
        this.uploadService.uploadProgressEvent.next(percentDone);
      }else if(event instanceof HttpResponse){
        this.showData = true;
        this.data = event.body;

        this.uploadService.uploadProgressEvent.next(101);
      }
    }, error => {
      this.uploadService.setErrorState(true);
      this.uploadService.uploadProgressEvent.next(101);
    });
  }

  onBack(){
    this.data = {};
    this.filename = "";
    this.showData = false;
  }

  onFileChange(e){
    let filename = e.target.value.split("\\").pop();
    let parts = filename.split(" ");
    let letters = filename.split("");
    filename = parts.slice(0, 20).join("");
    let sum = 0;
  
    for(let i = 0; i < parts.length; i++){
      if(sum + parts[i].length > 18){
        if(sum > 13){
          break;
        }else{
          sum = 18;
        }
      }else{
        sum += parts[i].length;
      }
    }
  
    filename = letters.slice(0, sum).join("");
    if(sum < letters.length) filename+= "...";

    this.filename = filename;
  }

}
