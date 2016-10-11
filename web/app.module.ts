import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { routing, declarations } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';
import { Main }  from './Component/Main/Main/Main';
import { AjaxService } from 'phpangular/Service/ajax.service';
import { UrlService } from 'phpangular/Service/url.service';
import { RepositoryService } from 'phpangular/Service/repository.service';
import { EntityManager } from 'phpangular/Service/entity.manager.service';

import './function';

@NgModule({
    imports: [
      BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        JsonpModule
    ],
    declarations: declarations,
    bootstrap:    [ Main ],
    providers: [
        AjaxService,
        UrlService,
        RepositoryService,
        EntityManager
    ]

})
export class AppModule { }
