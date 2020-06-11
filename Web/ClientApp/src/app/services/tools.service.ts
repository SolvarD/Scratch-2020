import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ContactMessage } from "../../models/contact";
import { FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { ProfileService } from "./profile.service";
import { AppDocument } from "../../models/document";
import { Profile } from "../../models/profile";

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

  public static uploadFile(attributName: string, file: File) {
    const reader = new FileReader();
    let emit = new Subject<{ formControlName, content }>();

    reader.addEventListener('load', () => {
      emit.next({ formControlName: attributName, content: <string>reader.result })
    });

    if (file) {
      reader.readAsDataURL(file);
    }

    return emit.asObservable();
  }

  public static getCV(profile: Profile = null) {
    if (!profile) {
      profile = ProfileService.owner;
    }
    if (!profile.cv.documentBase64) { return; }
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(ToolsService.converBase64toBlob(ProfileService.owner.cv.documentBase64, ProfileService.owner.cv.type));
    a.download = ProfileService.owner.cv.title;
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a)
  }
}

