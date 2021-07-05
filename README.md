# Prueba Técnica OneGroup 
 
## Instalación 
- tener clonado el repositorio en tu proyecto
- backend 
	 - npm i = para realizar las instalaciones necesarias
	 - npm run dev = para correr el proyecto
- frontend
	 - npm i = para realizar las instalaciones necesarias
	 - npm run serve = para correr el proyecto
 
## Herramientas utilizadas 
- nodejs
- express
- mongoose
- multer
- bcrypt
- jsonwebtoken
- cors
- morgan
- nodemon
- vuejs
- bootstrap 5
- fontawesome
- sweetalert2
- axios


## Funciones de este proyecto
este se basa en una especie de tienda online o catálogo, en el apartado de usuarios podremos encontrar 3 roles distintos de usuario, los cuales son:
- adminRol
	- este usuario puede:
		- administrar su propio usuario, después de crearlo, puede editar o eliminarlo y, si lo elimina se eliminará toda su información.
		- crear, eliminar, editar y ver sus productos.
		- puede ver todos los productos que hay en la app, sin importar que usuario los creó.
		- puede administrar los usuarios pero, solo eliminarlos en caso de ser necesario y al eliminar estos usuarios, también eliminará toda la información de dicho usuario.
		- este usuario no se puede crear como los otros puesto que la idea es que solo exista uno, para que puedas disfrutar de toda su funcionalidad, te dejare los datos de acceso:
			- email: admin@onegroup.com
			- contraseña: adminOneGroup
- vendedor
	- este usuario puede:
		- administrar su propio usuario, después de crearlo, puede editar o eliminarlo y, si lo elimina se eliminará toda su información.
		- crear, eliminar, editar y ver sus productos.
		- puede ver todos los productos que hay en la app, sin importar que usuario los creó.
- comprador
	- este usuario puede:
		- administrar su propio usuario, después de crearlo, puede editar o eliminarlo y, si lo elimina se eliminará toda su información.
		- puede ver todos los productos que hay en la app, sin importar que usuario los creó.

## Deploy
 - Back-end
 	- Glitch
 - Font-end
 	- Netlify
 - Base de datos
 	- MongoAtlas
