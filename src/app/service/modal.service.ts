import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnnimationComponent } from '../component/annimation/annimation.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  data;
  constructor(
    public dialog: MatDialog
  ) { }
  openDialog(imageObject): void {
    const dialogRef = this.dialog.open(AnnimationComponent, {
      width: '50%',
      data: { imageObject }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
