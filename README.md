# CarouselApp
Desarrollo de un Carousel en React Native (Challenge para ingresar a Puzzle)

Setup inicial:

// Instalamos expo-cli npm install -g expo-cli

// Inicializamos nuestro proyecto al que llamaremos CarouselApp expo init CarouselApp

Es posible que en este paso se produzca un error del tipo "expo : No se puede cargar el archivo....porque la ejecución de scripts está deshabilitada en este sistema..." 
Si este es el caso hay que habilitar la ejecución de scripts al menos para que se pueda ejecutar el comando de inicializacion de expo. 
Proceder de la siguiente manera (para windows) y luego volver a ejecutar el comando de inicialización:

Arrancar Powershell ejecutando como administrador. 
Tipear el siguiente comando para ver el status: get-executionpolicy -List

Para permitir la ejecucion de scripts tipear: 
set-executionpolicy -ExecutionPolicy Bypass -Scope LocalMachine (responder con S al prompt)

Volver a ver el status: 
get-executionpolicy -List (debe verse local machine con policy Bypass)

Salir del Powershell tipeando: exit

// Probamos su funcionamiento cd CarouselApp npm start
