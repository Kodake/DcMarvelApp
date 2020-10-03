import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.models';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://dcmarvelbackend.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(this.url + '/heroes.json', heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(this.url + '/heroes/' + heroe.id + '.json', heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(this.url + '/heroes/' + id + '.json');
  }

  obtenerHeroes() {
    return this.http.get(this.url + '/heroes.json')
      .pipe(
        map(this.crearArreglo),
        delay(1500)
      );
  }

  obtenerHeroe(id: string) {
    return this.http.get(this.url + '/heroes/' + id + '.json');
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    if (heroesObj === null) { return []; }
    return heroes;
  }
}