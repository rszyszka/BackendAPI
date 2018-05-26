import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';

  constructor(private htpp: HttpClient) { }

  getConfig() {
    return this.htpp.get(this.configUrl);
  }
}
