import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';

// test dialog components, should be declared in entryComponents for Angular versions less then 10
import { ExampleTextComponent } from './example-text/example-text.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
  ],
  declarations: [
    AppComponent,
    ExampleTextComponent,
    ExampleComponent,
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
