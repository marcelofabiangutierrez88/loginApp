import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:usuarioModel = new usuarioModel();
  recordarme :boolean = false;
  
  constructor(private auth:AuthService,
    private router:Router) { }
    
    ngOnInit() {
    
      if(localStorage.getItem('email')){
      this.usuario.email= localStorage.getItem('email');
      this.recordarme = true;
    }  
  
  }

  login (form:NgForm){

    if (form.invalid) {return;}

    
    Swal.fire({
      allowOutsideClick: false,
      text:'Espere por favor...'
    });
    
   Swal.showLoading();


    this.auth.login(this.usuario)
    .subscribe(resp=>{
      console.log(resp);
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    },(err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        text:err.error.error.message
      });
     
    });
    
  };
}
