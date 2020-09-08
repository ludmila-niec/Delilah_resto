# Delilah Resto :computer: :hamburger: :fries: :ramen:

#### Objetivo del proyecto

_Crear un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos que podría consumir un cliente._

## :red_circle: Instrucciones:

Vas a necesitar instalar Node.Js para trabajar con este repositorio

:one: **Descargar o clonar el respositorio**

```bash

git clone https://github.com/ludmila-niec/Delilah_resto.git

```

:two: **Crear la base de datos en phpMyAdmin**

```sql

CREATE  DATABASE  delilahresto

```

:three: **Abrir el proyecto descargado/clonado en el editor de código**


:four: **Instalar las dependencias**

```bash

npm install

```
:five: **Crear un archivo `.env` en el directorio principal**
```
Incluir las siguientes variables:
PORT=3000
TOKEN_SECRET = kdjfsj84kasjfn98JKHBIHS98SJKASNA9E2klldjoewru-043249
DB_USERNAME = root
DB_PASSWORD =  
DB_NAME = delilahresto
DB_HOST = localhost
```
:six: **Iniciar el servidor**

```bash

npm run dev

```

Al iniciar el servidor y establecer conexión con la base de datos, se crearán automaticamente las tablas en la base de datos. Este proyecto utiliza Sequelize Models.

También puede encontrar los scripts para crear las tablas individualmente en el directorio llamado "scripts". Es importante respetar el orden de los scripts de la tablas para crearlas correctamente.

:seven: **Registrar usuario con rol Admin**

_Primero debe registrarse como usuario normal en el siguiente endpoint:_

`POST "https://localhost:3000/auth/register`

**Ejemplo del payload:**

```console
 {
    "username":"ludmiladev",
    "password":"holamundo",
    "firstName":"ludmila",
    "lastName":"niec",
    "email": "ludmila@admin.com",
    "phone": 114598745,
    "adress": "ugarte 2256"
}
```

_Luego dirigirse a la base de datos en phpMyAdmin y asignar el rol de "Admin" al usuario de la siguiente manera:_

```sql

UPDATE users

SET isAdmin =  1

WHERE  user_id  = 1

```
`el valor de "user_id" va a ser el id del usuario al cual se quiera asignar el rol de Admin`

:eight: **Insertar datos de productos, metodos de pago y estados del pedido en la base de datos**

_Iniciar sesión con el usuario Admin en el siguiente endpoint:_

`POST "http://localhost:3000/auth/login`

**Ejemplo del payload:**

```console
{
    "email":"ludmila@admin.com",
    "password":"holamundo"
}
```

_Con el token obtenido en la respuesta ya tenes autorización para hacer un GET al siguiente endpoint:_

`GET "http://localhost:3000"`

Recordá agregar el token en headers "Authorization" = "Bearer {token}"

:tada: **_Listo! Ya podes comenzar a realizar pedidos_** :tada:

_Podes encontrar la documentación de la API en el archivo "api_delilah.yaml"._

_Allí encontraras la lista de endpoints con sus respectivas operaciones y autorizaciones._

---

#### Tambien podes ver la colección de endpoints con ejemplos de respuestas en Postman

[Ver en POSTMAN](https://documenter.getpostman.com/view/11970690/TVCiUSgq)

---

### Tecnologias Utilizadas:

-   Node.js

-   Express

-   JWT

-   REST

-   Sequelize

-   MySQL
