import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.models';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.obtenerHeroe(id)
        .subscribe((data: HeroeModel) => {
          this.heroe = data;
          this.heroe.id = id;
        });
    }
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      Swal.fire({
        title: 'Registro',
        text: 'El formulario no es válido.',
        allowOutsideClick: false
      });
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.heroe.id) {
      // peticion = this.heroesService.actualizarHeroe(this.heroe).subscribe(data => {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      // this.heroesService.crearHeroe(this.heroe).subscribe(data => {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(data => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente'
      });
    })
  }
}
