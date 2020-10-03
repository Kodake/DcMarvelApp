import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.models';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesServices.obtenerHeroes()
      .subscribe(data => {
        this.heroes = data;
        this.cargando = false;
      });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro que desea borrar a: ' + heroe.nombre,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor:   '#dc3545'
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesServices.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
