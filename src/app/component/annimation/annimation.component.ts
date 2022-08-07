import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annimation',
  templateUrl: './annimation.component.html',
  styleUrls: ['./annimation.component.scss']
})
export class AnnimationComponent implements OnInit {


  @Input() data: any[];

  imageObject: Array<object> = [/*{
    image: 'assets/myBlobFile.png',
    thumbImage: 'assets/myBlobFile.png',
    alt: 'alt of image',
    title: 'minimisation'
  }, {
    image: 'assets/myBlobFile.png', // Support base64 image
    thumbImage: 'assets/myBlobFile.png', // Support base64 image
    title: 'maximisation', //Optional: You can use this key if want to show image with title
    alt: 'Image alt' //Optional: You can use this key if want to show image with alt
  }, {
    image: 'assets/myBlobFile.png', // Support base64 image
    thumbImage: 'assets/myBlobFile.png', // Support base64 image
    title: 'maximisation', //Optional: You can use this key if want to show image with title
    alt: 'Image alt' //Optional: You can use this key if want to show image with alt
  }*/
  ];

  slideOpts = {};

  constructor(
    public dialogRef: MatDialogRef<AnnimationComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.datas["imageObject"]);
    this.imageObject = this.datas["imageObject"];

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
