# Lab Angular - Frontend con Laravel Backend

**Desarrollado por:** Fabio Melgarejo Cardozo

## 📋 Descripción
Aplicación Angular que consume API Laravel para gestión de productos con operaciones GET y POST.

## 🛠 Tecnologías
- **Frontend:** Angular
- **Backend:** Laravel
- **HTTP Client:** Angular HttpClient

## 🔌 Configuración API
### Servicio Angular (`Productoservice`)
```typescript
private base = 'http://127.0.0.1:8000/api/productos';

listaProductos(): Observable<any[]> {
  return this.http.get<any[]>(this.base);
}

agregarProducto(producto: any): Observable<any> {
  return this.http.post(this.base, producto);
}