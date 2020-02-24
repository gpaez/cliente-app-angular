import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(response => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `${response.mensaje}: ${response.cliente.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( response => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }

    )
  }

  

}
