import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import {ReactiveFormsModule} from '@angular/forms';
// import {Base64} from 'js-base64';
// (window as any).Base64 = Base64;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'assets/tinymce/tinymce.min.js'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
