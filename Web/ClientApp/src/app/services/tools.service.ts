import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ContactMessage } from "../../models/contact";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ProfileService } from "./profile.service";

@Injectable()
export class ToolsService {
  constructor() {

  }

  public static converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  public static arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public static uploadFile(form: FormGroup, formControlName: string, file: File) {
    const reader = new FileReader();
    let emit = new Subject<{ formControlName, content }>();

    reader.addEventListener('load', () => {
      form.controls[formControlName].value.content = <string>reader.result;
      form.controls[formControlName].value.title = file.name;
      form.controls[formControlName].value.type = file.type;
      emit.next({ formControlName: formControlName, content: <string>reader.result })
    });

    if (file) {
      reader.readAsDataURL(file);
    }

    return emit.asObservable();
  }

  public static getCV() {
    if (!ProfileService.owner.cv.content) { return; }
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(ToolsService.converBase64toBlob(ProfileService.owner.cv.content.split(',')[1], ProfileService.owner.cv.type));
    a.download = ProfileService.owner.cv.title;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}

