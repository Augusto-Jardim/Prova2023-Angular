import { Component } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Empresa } from '../empresa';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  empresas: Empresa[] = [];
  
  constructor(private empresaService: EmpresaService,
              private router : Router    ) {
  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      {
        next: data => this.empresas = data
      }
    );

  }

  create(){
    this.router.navigate(['createEmpresa']);
  }

  edit(empresa: Empresa) {
    this.router.navigate(['empresaDetails', empresa.id]);
  }

  delete(empresa: Empresa) {
    this.empresaService.delete(empresa).subscribe({
      next: () => this.loadClients()
    })
  }
}
