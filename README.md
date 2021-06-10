# Secure-Login-Platform
**Integrantes:** *Cristian Molina, Nicolas Martínez y Jose Morales*
## ¿Cómo lo hicimos?
Para la creación del programa, nos basamos principalmente en nuestro proyecto de grado, este es una aplicación web con un Dashboard para los grandes clientes de energía eléctrica de EMCALI. Dado que ya teníamos la estructura hecha, copiamos la parte que tiene que ver con el login, tanto para el back como para el front. 

Usamos una base de datos Oracle que la universidad nos había suministrado para guardar todos los registros del programa. El modelo relacional que usamos es el siguiente:

![image](https://user-images.githubusercontent.com/39702263/121429167-3affde80-c93c-11eb-95b9-a0e0339df847.png)


Un usuario tiene un username, un password y un rol; los roles que maneja la aplicación son *admin* y *regular*. Por otra parte, la tabla login guarda el registro de las fechas y horas en las que un usuario inicia sesión en la aplicación.

Con este modelo relacional, se generaron las clases en Java usando JPA Entities from Tables y el framework Spring. Después, se crearon los paquetes de persistencia mediante los cuales la aplicación se comunica con la base de datos por JDBC. Posteriormente, se creó el paquete de lógica para manipular los datos de manera adecuada. Una vez contando con los servicios necesarios para la aplicación, se creó un API REST para recibir peticiones HTTP y llamar a los servicios ya creados.

Esta es la estructura de un backend común sin seguridad, para corregir esto, se usó Spring Security para la autenticación y la autorización junto con JWT. Se creó una clase que implementa la interfaz *Password Encoder* haciendo uso del algoritmo PBKDF2. Lo anterior se realizó con base en este [blog](https://howtodoinjava.com/java/java-security/how-to-generate-secure-password-hash-md5-sha-pbkdf2-bcrypt-examples/#PBKDF2WithHmacSHA1).

Dado que este algoritmo hace uso de sal y de un número de iteraciones en las que realiza el hashing, se usó el algoritmo SHA1PRNG para generar la sal con números pseudo aleatorios y se determinó un número de 1.000 iteraciones. Además, se definió que el tamaño de la clave encriptada sería de 64 bytes.

De esta manera, finalizó la implementación del backend, los servicios expuestos por la API REST son:

 - **Login:** dada un username y una contraseña, el sistema retorna un bearer token si el usuario se autenticó correctamente. *No requiere estar autenticado para acceder a este recurso.*
 - **Blank Password:** se pone en blanco la contraseña de un usuario dado su username. *Requiere estar autenticado y tener un rol de admin.*
 - **Change Password:** se cambia la contraseña del usuario que se encuentra autenticado. *Requiere estar autenticado y tener un rol de regular.*
 - **Delete User:** se elimina a un usuario del sistema dado su username. *Requiere estar autenticado y tener un rol de admin.*
 - **Find All Users:** retorna los nombres de usuario de todos los usuarios del sistema. *Requiere estar autenticado y tener un rol de admin.*
 - **Get Last Login:** retorna la fecha y hora del último login registrado en la aplicación para el usuario que se encuentra autenticado. *Requiere estar autenticado y tener un rol de regular.*
 
Para la realización del front end (capa de visualización) se hizo uso de JavaScript, Html y CSS usando el framework de desarrollo Angular. Además, se hizo uso de la librería bootstrap y los componentes de nebular theme para la creación ágil de cada componente web. Teniendo en cuenta lo anterior, se implementó una vista de login, un Dashboard que cambia las funcionalidades dependiendo de los roles y una vista de logout. Para la autentificación se usan los servicios que provee el backend basado en JWT y se almacena la información necesaria dentro del almacenamiento de la sesión para persistir el token y la información de usuario. 

## Problemas que surgieron
Durante la implementación de esta aplicación, solo surgió un problema. Dado que ya teníamos implementada la estructura para nuestro proyecto de grado, la parte de seguridad no se había desarrollado con un total entendimiento de lo que se estaba haciendo, seguimos tutoriales para implementar la autenticación y autorización mediante Spring Security pero sin ser totalmente conscientes de lo que hacía cada fragmento de código. Es por esto que a la hora de modificar esta implementación para que haga uso de un algoritmo de hashing determinado, tuvimos que entender en profundidad lo que se estaba haciendo. Al final logramos entender todo lo que se estaba haciendo y encontramos el fragmento de código que tenía que ser remplazado para que usara nuestra implementación del algoritmo.

## Conclusiones

La seguridad web es un tema que los desarrolladores suelen pasar por alto. Cuando evaluamos la calidad del software, a menudo observamos métricas como el rendimiento, la compatibilidad con SEO y la accesibilidad, mientras que la capacidad del sitio web para resistir ataques maliciosos a menudo pasa desapercibida. Y aunque los datos confidenciales del usuario se almacenan en el lado del servidor y los desarrolladores de backend deben tomar medidas importantes para proteger los servidores, al final, la responsabilidad de asegurar esos datos se comparte entre el backend y el frontend. Estar consciente de la característica de las librerías que se utilizan es tarea vital para identificar riesgos y hacer el control necesario para asegurar la calidad del software.
