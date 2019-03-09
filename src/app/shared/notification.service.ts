import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(public toastr: ToastrService) { }
    //this.toastr.success('You are awesome!', 'Success!');

    success(message, title = 'Success') {
        this.toastr.success(
            message,
            title
        )
    }

    error(message = "Sorry, something went wrong. Please try again.", title = 'Error') {
        this.toastr.error(
            message,
            title
        )
    }

    info(message, title = 'Information') {
        this.toastr.info(
            message,
            title
        )
    }

    warn(message, title = 'Warning') {
        this.toastr.warning(
            message,
            title
        )
    }

}
