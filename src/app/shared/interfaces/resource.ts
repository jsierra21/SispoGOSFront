import { SafeResourceUrl } from '@angular/platform-browser';

export interface Resource {
  urlBase64: SafeResourceUrl;
  base64: string;
  mimetype: string;
}
