import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';  // Asegúrate de que la ruta esté correcta
import { ProductListComponent } from './products/product-list/product-list.component';  // Asegúrate de importar el componente correcto
import { AuthGuard } from './auth/auth.guard'; // Importar el guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },  // Ruta para el componente de productos
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: '**', redirectTo: '/login' }, // Manejar rutas no válidas 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura las rutas aquí
  exports: [RouterModule]
})
export class AppRoutingModule {}
