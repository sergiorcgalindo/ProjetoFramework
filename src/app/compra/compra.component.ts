import { Component, OnInit } from '@angular/core';
import { FrutaService } from '../services/fruta.service';
import { Fruta } from '../models/fruta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  fruta = {} as Fruta;
  frutas?: Fruta[];

  constructor(private frutaService: FrutaService) { }

  ngOnInit(): void {
    this.getFrutas();
  }

  // Chama o serviço para obtém todas as frutas
  getFrutas() {
    this.frutaService.getFrutas().subscribe((frutas: Fruta[]) => {
      this.frutas = frutas;
    });
  }

  saveFruta(form: NgForm) {
      
    this.fruta.qtdFruta = this.fruta.qtdFruta - 1;
    this.frutaService.updateFruta(this.fruta).subscribe(() => {
    
      });   
    
  }  

}
