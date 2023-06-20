import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {
  
  formGroupEmpresa: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupEmpresa = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getClientById(id);
  }

  getClientById(id: number) {
    this.empresaService.getEmpresa(id).subscribe({
      next: data => {
        this.formGroupEmpresa.setValue(data);
        this.isEditing = true;
      }
    })
  }


  save() {
    this.submitted = true;
    if (this.formGroupEmpresa.valid) {
      if (this.isEditing) {
        this.empresaService.update(this.formGroupEmpresa.value).subscribe({
          next: () => {
            this.router.navigate(['empresas']);
          }
        })
      }
      else {
        this.empresaService.save(this.formGroupEmpresa.value).subscribe({
          next: () => {
            this.router.navigate(['empresas']);
          }
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['empresas']);
  }


  get name(): any {
    return this.formGroupEmpresa.get("name");
  }

  get email(): any {
    return this.formGroupEmpresa.get("email");
  }
  get telefone(): any {
    return this.formGroupEmpresa.get("telefone");
  }
  get endereco(): any {
    return this.formGroupEmpresa.get("endereco");
  }


}