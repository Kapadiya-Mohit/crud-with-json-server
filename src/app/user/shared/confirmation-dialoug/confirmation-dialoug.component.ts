import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-dialoug',
  templateUrl: './confirmation-dialoug.component.html',
  styleUrls: ['./confirmation-dialoug.component.scss'],
})
export class ConfirmationDialougComponent {
  constructor(public bsModalRef: BsModalRef) {}

  /**
   * Close delete modal
   * @param {boolean} isDeleteUser
   * @memberof ConfirmationDialougComponent
   */
  close(isDeleteUser: boolean): void {
    this.bsModalRef.hide();
    this.bsModalRef.onHidden?.emit(isDeleteUser);
  }
}
