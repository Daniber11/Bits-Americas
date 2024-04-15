## README de la Aplicación Bancaria

# Aplicación Bancaria

# Descripción

Esta aplicación web simula la operación de un banco, permitiendo la gestión de clientes, cuentas y movimientos. Utiliza Angular para el front-end y Spring Boot para el back-end.

# Funcionalidades

Creación, modificación, consulta y eliminación de clientes y cuentas.
Registro de movimientos en una cuenta con validación de saldo negativo.
Generación de un informe que muestra las cuentas asociadas con sus saldos y el total de débitos y créditos realizados durante un rango de fechas para un cliente especificado.
Mostrar notas de Chuck Norris en la parte superior de las pantallas.

# Front-end (Angular)

Scripts Disponibles
ng serve: Ejecuta la aplicación en modo de desarrollo.
ng build: Compila la aplicación para producción.
ng test: Ejecuta pruebas unitarias a través de Karma.
Principales Dependencias
@angular/animations
@angular/cdk
@angular/common
@angular/core
@angular/forms
@angular/material
@angular/platform-browser
@angular/platform-browser-dynamic
@angular/router
chart.js

# Componentes de Angular

AccountComponent: Gestiona la visualización y gestión de cuentas. Utiliza MatTableDataSource para mostrar datos en una tabla. Utiliza MatDialog para abrir ventanas modales de diálogo. Utiliza MatSnackBar para mostrar mensajes de notificación. Implementa métodos para agregar, editar, eliminar y buscar cuentas.
NewAccountComponent: Gestiona la creación o actualización de una cuenta. Utiliza FormGroup para manejar el formulario de creación o actualización. Utiliza MatDialogRef para cerrar el diálogo y devolver un resultado. Implementa métodos para guardar o cancelar la operación.

ClientComponent: Gestiona la visualización y gestión de clientes. Similar a AccountComponent, utiliza MatTableDataSource para mostrar datos en una tabla. Implementa métodos para agregar, editar, eliminar y buscar clientes.

NewClientComponent: Similar a NewAccountComponent, gestiona la creación o actualización de un cliente.
MovementComponent: Gestiona la visualización y gestión de movimientos de cuenta. Similar a AccountComponent, utiliza MatTableDataSource para mostrar datos en una tabla. Implementa métodos para agregar, editar, eliminar y buscar movimientos.

NewMovementComponent: Similar a NewAccountComponent y NewClientComponent, gestiona la creación o actualización de un movimiento.

HomeComponent: Importa Chart desde 'chart.js' para crear gráficos. Inyecta ClientService, AccountService y MovementService para obtener datos de clientes, cuentas y movimientos respectivamente. En el método ngOnInit(), llama a los métodos para obtener datos de clientes, cuentas y movimientos. Crea gráficos de barras y donut para visualizar datos de cliente, cuenta y movimiento.

SidenavComponent: Utiliza MediaMatcher para determinar si el dispositivo es móvil. Define un menú de navegación con rutas al HomeComponent, ClientComponent, AccountComponent, MovementComponent y ChuckNorrisComponent.

# Servicios de Angular

AccountService: Define métodos para obtener, guardar, actualizar y eliminar cuentas, así como para buscar cuentas por ID.

ChuckNorrisService: Define un método para obtener un chiste aleatorio de la API de Chuck Norris.

ClientService: Define métodos para obtener, guardar, actualizar y eliminar clientes, así como para buscar clientes por ID.

MovementService: Define métodos para obtener, guardar, actualizar y buscar movimientos, así como para buscar movimientos por fecha e ID.

# Routing de Angular

DashboardRoutingModule: Define una sola ruta para el DashboardComponent. Utiliza lazy loading para cargar el módulo de enrutamiento RouterChildModule de forma diferida.

RouterChildModule: Define rutas secundarias para HomeComponent, AccountComponent, MovementComponent, ChuckNorrisComponent y ClientComponent.

AppRoutingModule: Define una ruta principal que redirige a /dashboard. Importa DashboardRoutingModule e inclúyelo en las rutas principales de la aplicación.

# Notas Generales

Se utiliza inyección de dependencias para obtener instancias de servicios como AccountService, ClientService, MovementService, etc.

ViewChild se utiliza para obtener una referencia al paginador de la tabla y paginar los resultados.
Se utilizan formularios reactivos de Angular para manejar los datos del formulario.

Los servicios como AccountService, ClientService, MovementService se utilizan para realizar operaciones CRUD en el backend.

## Back-end (Spring Boot)

Principales Dependencias
spring-boot-starter-data-jpa
spring-boot-starter-web
spring-boot-devtools
spring-boot-starter-test
lombok
Endpoints de la API REST
Cliente

GET /api/v1/clients: Obtiene todos los clientes.
GET /api/v1/clients/{id}: Obtiene un cliente por ID.
POST /api/v1/clients: Crea un nuevo cliente.
PUT /api/v1/clients/{id}: Actualiza un cliente existente.
DELETE /api/v1/clients/{id}: Elimina un cliente por ID.
Cuenta

GET /api/v1/accounts: Obtiene todas las cuentas.
GET /api/v1/accounts/{id}: Obtiene una cuenta por ID.
POST /api/v1/accounts: Crea una nueva cuenta asociada a un cliente.
PUT /api/v1/accounts/{id}: Actualiza una cuenta existente.
DELETE /api/v1/accounts/{id}: Elimina una cuenta por ID.
Movimiento

GET /api/v1/movements/accounts/{accountId}: Obtiene todos los movimientos de una cuenta por su ID.
PUT /api/v1/movements: Actualiza un movimiento existente.
GET /api/v1/movements/clients/{clientId}: Obtiene todos los movimientos de todas las cuentas de un cliente en un rango de fechas.
POST /api/v1/movements: Crea un nuevo movimiento asociado a una cuenta.
MovementServiceImpl

Esta clase es un servicio que implementa la interfaz IMovementService y proporciona métodos para buscar movimientos por cuenta, actualizar movimientos y buscar movimientos por fecha para un cliente dado. Utiliza un objeto IMovementDao para acceder a la capa de acceso a datos (DAO).

MovementRestController
Este controlador define los endpoints REST para operaciones relacionadas con movimientos. Tiene métodos para buscar movimientos por cuenta, actualizar movimientos, buscar movimientos por fecha para un cliente dado y guardar nuevos movimientos. Utiliza un objeto IMovementService para realizar estas operaciones.

AccountRestController
Este controlador define los endpoints REST para operaciones relacionadas con cuentas. Tiene métodos para buscar cuentas, buscar cuentas por ID, crear nuevas cuentas, actualizar cuentas y eliminar cuentas. Utiliza un objeto IAccountService para realizar estas operaciones.

ClientRestController
Este controlador define los endpoints REST para operaciones relacionadas con clientes. Tiene métodos para buscar clientes, buscar clientes por ID, crear nuevos clientes, actualizar clientes y eliminar clientes. Utiliza un objeto IClientService para realizar estas operaciones.

MovementResponseRest, AccountResponseRest, ClientResponseRest
Estas clases son contenedores para la respuesta de servicios relacionados con movimientos, cuentas y clientes respectivamente. Contienen un objeto Metadata que describe el estado de la respuesta y un objeto Response correspondiente que contiene la lista de movimientos, cuentas o clientes devueltos por el servicio.

IAccountService, IClientService, IMovementService
Estas interfaces definen los métodos que los servicios relacionados con cuentas, clientes y movimientos deben implementar. Incluyen métodos para buscar, crear, actualizar y eliminar entidades.

# Pruebas Unitarias y E2E

Front se reliazo pruebas unitarias con Karma y Jasmine.

Back se reliazo pruebas unitarias con JUnit y Spring Boot Test.

Front se reliazo pruebas E2E con Protractor.

# Ejecución del Proyecto

Importa el proyecto en tu IDE favorito como un proyecto Maven existente.
Ejecuta la aplicación como una aplicación Spring Boot.
Requisitos
Node.js
Angular CLI
Java 17
Maven
Instalación y Ejecución
Clona este repositorio.
Instala las dependencias del front-end con npm install.
Instala las dependencias del back-end con Maven: mvn install.
Ejecuta el back-end con mvn spring-boot:run.
Ejecuta el front-end con ng serve.

Licencia
MIT
