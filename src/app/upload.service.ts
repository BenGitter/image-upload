import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class UploadService {

  showProgress: boolean = false;
  uploadProgressEvent: Subject<number> = new Subject();

  constructor(private http:HttpClient) { }

  submitForm(e:any){
    this.showProgress = true;

    const formData = new FormData();
    formData.append("upfile", e.target[0].files[0]);

    const req = new HttpRequest("POST", "https://petal-buzzard.glitch.me/upload", formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  hideProgressBar(){
    setTimeout(() => {
      this.uploadProgressEvent.next(0);
      this.showProgress = false;
    }, 1000);
  }
}
