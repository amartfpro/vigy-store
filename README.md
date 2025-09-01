
<p align="center">
  <a href="https://vigy-storefront.vercel.app/es">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="src/public/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="src/public/logo-light.svg">
    <img alt="VIGY Logo" src="public/images/logo-light.svg" width="150">
    </picture>
  </a>
</p>

<h1 align="center">
  VIGY Backend
</h1>

<p align="center">
VIGY es una marca de moda fundada por Valentín González y Ángel Martínez, dos jóvenes leoneses con una visión clara: crear prendas que fusionen la estética deportiva vintage con la versatilidad moderna. Cada colección está diseñada para personas que buscan autenticidad, calidad y comodidad en su vestimenta. Ya sea para el día a día o para ocasiones especiales, estas están creadas para ofrecer lo mejor en estilo y confort.
</p>

<p align="center">
Este repositorio contiene el backend de VIGY, basado en MedusaJS, un framework de comercio para construir aplicaciones de comercio electrónico de alto rendimiento.
</p>

<p align="center">
Este backend está diseñado para integrarse completamente con el frontend de VIGY Storefront, que puedes consultar en el repositorio [vigy-storefront](https://github.com/amartfpro/vigy-storefront).
</p>

<p align="center">
  <a href="https://github.com/amartfpro/vigy-store">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!"/>
  </a>
  <a href="https://instagram.com/vigysport">
    <img src="https://img.shields.io/badge/Instagram-%40vigysport-4c7d7e.svg" alt="Follow @vigysport on Instagram" />
  </a>
</p>

## Características

- **Backend de MedusaJS**: Utiliza **MedusaJS** para la gestión de productos, inventario, pedidos, pagos, y más.
  
- **Soporte para pagos con Stripe**: Integración con **Stripe** para realizar pagos seguros y fáciles a través de la tienda online.

- **Búsqueda avanzada con Algolia**: Implementación de **Algolia** para permitir búsquedas rápidas y precisas dentro del catálogo de productos.

- **Escalabilidad y personalización**: El backend está diseñado para ser altamente escalable y personalizable para adaptarse a las necesidades de **VIGY** y otros posibles proyectos de ecommerce.

- **Autenticación y gestión de usuarios**: Incluye una gestión robusta de usuarios y roles, permitiendo a los administradores gestionar productos y pedidos de manera eficiente.

- **Soporte para múltiples regiones y monedas**: El sistema está preparado para funcionar en diferentes regiones y soportar múltiples monedas.

- **Completamente open-source**: Todos los módulos están disponibles como código abierto y pueden ser modificados según las necesidades.

## Estructura del Proyecto

```
/src                     - Contiene la lógica principal del backend
  /controllers            - Controladores para manejar las rutas de la API
  /services               - Servicios que implementan la lógica de negocio
  /models                 - Modelos para la base de datos
  /routes                 - Rutas de la API y sus controladores
  /utils                  - Utilidades compartidas, como validadores y helpers
/config                   - Archivos de configuración de la aplicación
  /database               - Configuración de la base de datos (PostgreSQL)
  /medusa                 - Configuración de MedusaJS
  /stripe                 - Configuración de la integración de Stripe
  /algolia                - Configuración de la integración de Algolia
```

## Instalación

### Requisitos previos

1. **Node.js** >= 16.0.0
2. **npm** >= 8.0.0
3. **PostgreSQL**: Asegúrate de tener PostgreSQL instalado y configurado para la base de datos.
4. **Stripe**: Necesitarás una cuenta de **Stripe** para la integración de pagos. Obtén tus claves API de [Stripe](https://stripe.com).
5. **Algolia**: Si vas a usar **Algolia** para la búsqueda avanzada, necesitarás las claves API de [Algolia](https://www.algolia.com/).
6. **Editor de código**: Se recomienda usar **Visual Studio Code** o cualquier editor compatible con JavaScript/TypeScript.

### Clonación del repositorio

```bash
git clone https://github.com/amartfpro/vigy-store.git
cd vigy-store
```

### Instalación de dependencias

```bash
npm install
```

### Configuración de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega tus variables de entorno:

```env
# Medusa Configuration
MEDUSA_BACKEND_URL=<URL_de_tu_backend>
MEDUSA_API_TOKEN=<API_token_de_medusa>

# PostgreSQL Configuration
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/tu_basededatos

# Stripe Configuration
STRIPE_API_KEY=<tu_clave_api_de_stripe>

# Algolia Configuration
ALGOLIA_API_KEY=<tu_clave_api_de_algolia>
ALGOLIA_APP_ID=<tu_app_id_de_algolia>

# Otros servicios adicionales
```

### Ejecución del servidor

```bash
npm run dev
```

El servidor se ejecutará en el puerto **9000** de manera predeterminada. Accede a la API de Medusa en `http://localhost:9000`.

## Despliegue

Este backend está optimizado para ser desplegado en Railway. Para hacerlo, simplemente vincula tu repositorio con el servicio de despliegue y configura las variables de entorno adecuadas.

## Contribuciones

Se ha realizado un primer sprint, dando lugar a un VMP. Se considera realizar un segundo sprint para aumentar las funcionalidades
y mejorar la experiencia del cliente además de seguir personalizando el servicio con la estética y valores de la marca.
Este proyecto está en constante evolución y las contribuciones son bienvenidas. Si tienes alguna mejora o corrección, por favor abre un **issue** o un **pull request**. Estamos comprometidos a mejorar continuamente el backend de **VIGY** y te agradecemos encarecidamente por cualquier aporte.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Para más detalles, consulta el archivo [LICENSE](./LICENSE).
