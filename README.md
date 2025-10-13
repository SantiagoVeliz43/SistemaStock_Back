## Pasos para compilar y ejecutar el proyecto

1. Instala las dependencias `bun i`
2. Crear `.env` con las variables de entorno necesarias
3. Generar el esquema de prisma `bun prisma generate`
4. Ejecutar migraciones `bun prisma migrate dev`
5. Compila y ejecuta el proyecto `bun dev`.

Si no se ejecuta correctamente, verifica que las variables de entorno estén correctamente configuradas.
