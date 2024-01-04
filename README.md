# Descripción



## Correr en dev


1. Clonar el repositorio.
2. Correr Docker desktop o Docker deamon

En el servidor 
  1. Entrar en la carpeta server
  2. Crear una copia del ```.env.example``` y renombrarlo a ```.env```
  3. Instalar dependencias ```yarn``` o ```npm i```
  4. Levantar la base de datos ```docker compose up -d```
  5. Correr las migraciones de Primsa ```npx prisma migrate dev```
  6. Ejecutar seed ```yarn seed``` o ```npm run seed```
  7. Levantar el servidor con ```yarn dev``` o ```npm run dev```

En el cliente
  1. Entrar en la carpeta client
  2. Instalar dependencias ```yarn``` o ```npm i```
  3. Levantar el servidor con ```yarn dev``` o ```npm run dev```
  4. Loguearse con usuario: admin contraseña: admin123 modo ADMINISTRADOR o usuario: user contraseña: user123 modo OPERADOR






