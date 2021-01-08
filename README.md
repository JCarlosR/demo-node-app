## App Node de ejemplo usando Docker

Esta app muestra y permite editar un perfil de usuario.
Incluye:
- Un archivo index.html con js y css inline
- Un archivo server.js como backend nodejs usando express
- Una conexión mongodb para guardar los datos

## 3 Componentes
El proyecto podría funcionar si instalamos Node, MongoDB y Mongo Express en nuestro servidor local.
Pero la intención es no instalar ninguno de ellos y que funcione gracias a Docker.

Para ello creamos 3 contenedores:
- Un contenedor Node que contiene el código de nuestra app
- Un contenedor de MongoDB asociado a un volumen
- Y uno de Mongo Express para consultar nuestra BD a través de una UI

## Cómo iniciar el proyecto

### Usando comandos Docker

Puedes revisar el archivo txt incluido en el repositorio y ejecutar cada uno de los comandos.

Con estos comandos puedes:
- Crear una imagen basada en Node con el código de la app.
- Iniciar un contenedor de mongo y mongo-express
- Definir las credenciales de mongo como variables de entorno 
- Configurar Mongo Express para que se conecte a Mongo DB
- Asociar los contenedores a una Network
- Exponer puertos para que estén disponibles en nuestro Host

### Usando Docker Compose

O bien puedes hacer todo lo anterior ejecutando un solo comando:

    docker-compose up
    
## Una vez iniciado el proyecto

- Puedes acceder a mongo-express desde localhost:8081 en tu navegador.
  Desde allí puedes crear una base de datos "my-db" y una colección "users".       
    
- Puedes acceder a la aplicación desde localhost:8080 en tu navegador.
