import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`)//Esta solicitud busca un usuario en la base de datos que tenga ese nombre de usuario y contraseña.

      .subscribe(users => {//subscribe() maneja la respuesta asíncrona de la solicitud HTTP y ejecuta el código según si las credenciales son correctas o no.
        if (users.length > 0) {
          // Credenciales correctas
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(users[0])); // Guardar sesión en localStorage
          this.router.navigate(['/products']); // Redirigir al listado de productos
        } else {
          // Credenciales incorrectas
          alert('Usuario o contraseña incorrectos');
        }
      });
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('user'); // Eliminar la sesión
    this.router.navigate(['/login']); // Redirigir al login
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Verifica si hay una sesión activa
  }
}
