import { Component } from '@angular/core';
import { Productoservice } from '../core/services/productoservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  productos: any[] = [];
  
  constructor(private productoService: Productoservice) {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.listaProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log(this.productos);
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  nuevoProducto = {
    nombre: '',
    precio: '',
    categoria_id: ''
  };

  categorias = [
    { id: 1, nombre: 'Electrónicos' },
    { id: 2, nombre: 'Hogar' },
    { id: 3, nombre: 'Deportes' }
  ];
  agregarProducto(): void {
    // Validar que todos los campos estén llenos
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio || !this.nuevoProducto.categoria_id) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Convertir precio a número (si es necesario)
    const productoEnviar = {
      nombre: this.nuevoProducto.nombre,
      precio: parseFloat(this.nuevoProducto.precio),
      categoria_id: parseInt(this.nuevoProducto.categoria_id)
    };

    this.productoService.agregarProducto(productoEnviar).subscribe({
      next: (response) => {
        console.log('Producto agregado:', response);
        
        this.nuevoProducto = {
          nombre: '',
          precio: '',
          categoria_id: ''
        };

        // Recargar la lista de productos
        this.listarProductos();
        
        alert('Producto agregado exitosamente');
      },
      error: (err) => {
        console.error('Error al agregar producto', err);
        alert('Error al agregar el producto');
      }
    });
  }
}
