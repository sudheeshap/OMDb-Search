import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { environment } from './../../../environments/environment';
import { MovieComponent } from './movie.component';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';


describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let movieService: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [ MovieComponent ]
    })
    .compileComponents();

    movieService = TestBed.get(MovieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = <Movie>{};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#thumbImageLink', () => {  
    it('should return poster URL if not N/A', () => {
      component.movie.Poster = 'http://imdb.com/67cgdf3jk';
      expect(component.thumbImageLink).toBe(component.movie.Poster);
    });
    it('should return empty string if N/A', () => {
      component.movie.Poster = 'N/A';
      expect(component.thumbImageLink).toBe('');
    });
  });

  describe('#onClickAdd', () => {
    let movie: Movie;
    beforeEach(() => {
      spyOn(movieService, 'addMovie');
      movie = <Movie>{ Poster: 'ab', Title: 'ABC', isListed: false };
      component.onClickAdd(movie);
    });

    it('should set movie.isListed to true', () => {
      expect(movie.isListed).toBe(true);
    });
    it('should call movieService.addMovie(movie)', () => {
      expect(movieService.addMovie).toHaveBeenCalledWith(movie);
    });
  });

  describe('#onClickRemove', () => {
    let movie: Movie;
    beforeEach(() => {
      spyOn(movieService, 'removeMovie');
      movie = <Movie>{ Poster: 'ab', Title: 'ABC', isListed: false };
      component.onClickRemove(movie);
    });

    it('should set movie.isListed to false', () => {
      expect(movie.isListed).toBe(false);
    });
    it('should call movieService.removeMovie(movie)', () => {
      expect(movieService.removeMovie).toHaveBeenCalledWith(movie);
    });
  });
});
