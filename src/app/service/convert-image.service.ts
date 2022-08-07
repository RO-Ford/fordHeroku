import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertImageService {

  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;

  constructor(private domSanitizer: DomSanitizer) { }

  sanatizeUrl(generatedImageUrl): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }

  /* Method to fetch image from Url */
  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getImage(imageUrl: string) {
    this.windowOPen = true;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  getImageWithoutWindowOpen(imageUrl: string) {
    this.windowOPen = false;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  /**Method that will create Blob and show in new window */
  createBlobImageFileAndShow(): void {
    this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.generateName();
      const imageFile: File = new File([imageBlob], imageName, {
        type: "image/jpeg"
      });
      this.generatedImage = window.URL.createObjectURL(imageFile);
      // on demo image not open window
      if (this.windowOPen) {
        window.open(this.generatedImage);
      }
    });
  }

  /**Method to Generate a Name for the Image */
  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    // Replace extension according to your media type like this
    return date + "." + text + ".jpeg";
  }

  /* Method to convert Base64Data Url as Image Blob */
  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: "image/jpeg" });
      observer.next(blob);
      observer.complete();
    });
  }
}
