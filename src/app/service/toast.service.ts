import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, titre, duration) {

    this.toastr.success(message, titre, {
      timeOut: duration,
    });
  }
  showError(message, titre, duration) {
    console.log("yo", message);
    let msg = " Arc ";
    message.forEach(element => {
      msg = msg + " from " + element.from * (-1) + " to " + element.to * (-1);
    });
    this.toastr.error(msg, titre, {
      timeOut: duration,
    });
  }
}
