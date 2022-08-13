import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MessageResponse } from "src/transport/helper/message.response";

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  public showNotification(message: MessageResponse) {
    switch (message.type) {
      case 'SUCCESS': {
        this.toastr.success(message.title, message.message);
        break;
      }
      case 'ERROR': {
        this.toastr.error(message.title, message.message);
        break;
      }
      default: {
        break;
      }
    }
  }
}
