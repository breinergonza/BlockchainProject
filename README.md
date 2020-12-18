Proyecto de Blockchain con Etherium y Ganache [Power by: Breitner Gonzalez](https://breinergonza.net/).

## Descripción

Este es un proyecto desarrollado con el framework de React utilizando la libreria de Redux para hacer predecibles los cambios de estado en la solución. 

Este proyecto implementa un contrato inteligente utilizando ganache y Etherium.

### Pasos para ejecutar la aplicación

Se instalan los paquetes de la solución
```
npm i
```

Se ejecuta el comando para compilar los contratos
```
truffle compile
```

Se ejecuta el comando de para comenzar la ejecución de la migración desde la última migración que se ejecutó
```
truffle migrate
```

Se ejecutan las pruebas automatizadas con Moka
```
truffle test
```

Se inicia la ejecución del proyecto
```
npm run start
```