# El Buen Sabor — Frontend

Ecommerce de restaurante desarrollado en React + TypeScript. Permite a los clientes explorar el catálogo de productos, agregar items al carrito y confirmar pedidos con pago en efectivo o Mercado Pago.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 + TypeScript | Framework principal |
| Vite | Bundler y dev server |
| React Router v6 | Navegación y rutas |
| Formik | Manejo de formularios |
| React Bootstrap | Componentes UI base |
| CoreUI React | Componentes de tarjetas |
| @mercadopago/sdk-react | Integración de pagos |
| React Icons | Íconos (BsCart, RxCross2, etc.) |
| React Toastify | Notificaciones |

---

## Estructura del proyecto

```
src/
├── assets/                  # Imágenes y logo
├── components/
│   ├── common/
│   │   ├── nav-bar/         # NavBar con carrito lateral
│   │   ├── cart-sidebar/    # Sidebar del carrito
│   │   └── footer/          # Footer
│   ├── product/
│   │   ├── ProductCard      # Tarjeta de producto
│   │   ├── Products         # Grilla de productos
│   │   ├── category-list/   # Lista de categorías
│   │   └── product-details/ # Detalle de producto
│   ├── page/
│   │   └── Cart/
│   │       └── Counter      # Contador de cantidad
│   ├── order/
│   │   └── OrderForm        # Modal de confirmación de pedido
│   └── spinner-loading/     # Spinner de carga
├── context/
│   ├── CartContext          # Estado global del carrito
│   └── SpinnerContext       # Estado global del spinner
├── enum/
│   ├── OrderStatus          # Estados del pedido
│   └── Paid                 # Estados de pago
├── interface/
│   ├── Product              # Modelo de producto
│   ├── Category             # Modelo de categoría
│   └── Order                # Modelo de orden
├── route/
│   └── Route                # Definición de rutas
├── services/                # Hooks de fetch genéricos
├── util/
│   └── useCreateMPPreference # Hook para crear preferencia MP
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd frontend

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000   o  https://ecommerce-back-end-fawn.vercel.app
VITE_MP_PUBLIC_KEY=TU_PUBLIC_KEY_DE_MERCADO_PAGO
```

---

## Integración con el backend

El frontend se comunica con una API REST en NestJS. Los endpoints principales que consume son:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/category/catalogue` | Lista de categorías |
| GET | `/api/price/p/:id` | Producto con precio |
| POST | `/api/order` | Crear pedido |
| POST | `/api/mercadopago/create-preference` | Crear preferencia MP |

---

## Flujo de compra

1. El usuario navega el catálogo y filtra por categoría
2. Agrega productos al carrito desde la tarjeta o el detalle
3. El carrito se muestra como sidebar lateral
4. Al confirmar, se abre el modal de pedido
5. El usuario elige método de entrega (delivery o retiro en local con 10% de descuento)
6. Elige forma de pago: efectivo o Mercado Pago
7. Si elige MP, se genera una preferencia y se abre el checkout en una nueva pestaña
8. Según el resultado del pago, se redirige a `/orden/success`, `/orden/failure` o `/orden/pending`

---

## Mercado Pago — modo prueba

La integración usa `sandbox_init_point` para pruebas. Para testear el flujo de pago usar las credenciales de la cuenta test comprador disponibles en [developers.mercadopago.com](https://developers.mercadopago.com) bajo **Cuentas de prueba**.

Para pasar a producción:
1. Reemplazar `sandbox_init_point` por `init_point` en el backend
2. Reemplazar las credenciales de prueba por las productivas en `.env`
3. Eliminar el bloque `mp-test-box` del `OrderForm`

---

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linter
```

---

## Diseño

La interfaz usa una paleta negra/dorada/crema con tipografía `Cormorant Garamond` para títulos y `Jost` para el cuerpo, cargadas desde Google Fonts. El diseño es completamente responsive con breakpoints en 768px y 480px.