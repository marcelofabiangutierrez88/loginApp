import { Component, OnInit } from '@angular/core';
import { usuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

usuario:usuarioModel;
recordarme: false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() { 

    this.usuario=new usuarioModel();
  

  }
onSubmit(form:NgForm){

  if (form.invalid) {return;}

  Swal.fire({
    allowOutsideClick: false,
    text:'Espere por favor...'
  });
  
 Swal.showLoading();

  this.auth.nuevoUsuario(this.usuario)
  .subscribe( resp =>{
    console.log(resp);
    Swal.close();
    if(this.recordarme){
      localStorage.setItem('email',this.usuario.email);
    }
    this.router.navigateByUrl('/home');
  }, err=>{
    console.log(err.error.error.message);
    Swal.fire({
      title: 'Error al autenticar',
      text:err.error.error.message
    });
  });
}

}
