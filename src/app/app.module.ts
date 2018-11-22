import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    WatchlistComponent,
    SearchFilterComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
    AngularFireDatabaseModule,
    NgbDropdownModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
