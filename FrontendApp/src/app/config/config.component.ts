import { ConfigService } from './../config.service';
import { Component, OnInit } from '@angular/core';
import { Config } from '../config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  config: Config;
  headers: string[];

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        ...data
      });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          '${key}: ${resp.headers.get(key)}');
      });
  }
}
