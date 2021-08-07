import { Component, OnInit } from '@angular/core';
import { FrutaService } from '../services/fruta.service';
import { Fruta } from '../models/fruta';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-fruta',
  templateUrl: './fruta.component.html',
  styleUrls: ['./fruta.component.css']
})
export class FrutaComponent implements OnInit {

  fruta = {} as Fruta;
  frutas?: Fruta[];

  constructor(private frutaService: FrutaService) { }

  ngOnInit() {   
    this.getFrutas();
  }

  // Chama o serviço para obtém todas as frutas
  getFrutas() {
    this.frutaService.getFrutas().subscribe((frutas: Fruta[]) => {
      this.frutas = frutas;
    });
  }

  // defini se uma fruta será criada ou atualizada
  saveFruta(form: NgForm) {
        
    this.fruta.fotoFruta = this.fruta.fotoFruta.replace('C:\\fakepath\\', '');
    if (this.fruta.idFruta !== undefined) {
      this.frutaService.updateFruta(this.fruta).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.frutaService.saveFruta(this.fruta).subscribe(() => {
        this.cleanForm(form);
      });
    }
    this.cleanForm(form);
    
  }  

  // deleta fruta
  deleteFruta(fruta: Fruta) {
    this.frutaService.deleteFruta(fruta).subscribe(() => {
      this.getFrutas();
    });
  }

  // copia a fruta para ser editada
  editFruta(fruta: Fruta) {
    this.fruta = { ...fruta };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFrutas();
    form.resetForm();    
  }

}
