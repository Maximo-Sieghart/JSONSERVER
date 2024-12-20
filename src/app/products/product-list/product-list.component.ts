import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'; // Importa Router


interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  standalone: false,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Lista de productos
  newProduct: Omit<Product, 'id'> = { name: '', description: '', price: 0 };
// Objeto para el formulario de agregar producto

  constructor(private productService: ProductService, private router: Router ) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Cargar la lista de productos
  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Eliminar un producto
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

  // Agregar un nuevo producto
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.description && this.newProduct.price) {
      this.productService.addProduct(this.newProduct).subscribe((product) => {
        this.products.push(product); // Añadir el nuevo producto a la lista local
        this.newProduct = { name: '', description: '', price: 0 }; // Reiniciar el formulario
      });
    }
  }
  logout(): void {
    localStorage.removeItem('user'); // Eliminar la sesión del usuario
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
