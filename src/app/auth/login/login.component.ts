import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {//Este método se llama cuando el usuario hace clic en el botón de inicio de sesión.
    if (this.username && this.password) {//verifica que no esten vacios
      this.authService.login(this.username, this.password);//llama al login de service pasandole el user y la pass
    } else {
      alert('Por favor ingrese su usuario y contraseña');
    }
  }
}
