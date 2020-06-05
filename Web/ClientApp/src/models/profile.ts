import { AppDocument } from "./Document";

export class Profile {
  public profileId: number = 0;
  public isPrincipal: boolean;
  public presentation: string = '';
  public pastPro: string = '';
  public whyMe: string = '';
  public advantage: string = '';
  public price: number;
  public documentId_Photo: number;
  public documentId_CV: number;

  public cv: AppDocument;
  public photo: AppDocument;


}
