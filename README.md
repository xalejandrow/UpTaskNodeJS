# UpTaskNodeJS
Proyecto UpTask con Node y MVC



Capitulo 52:
    Instalar Babel
    https://github.com/babel/babel-loader

en consola:
 npm install -D babel-loader @babel/core @babel/preset-env webpack
  528  npm install --save concurrently
  529  npm run watch
  530  npm run watch
  531  npm start

Capitulo 52:
    Instalar axios

    npm install --save axios sweetalert2

    diálogos de confirmación sweetalert2
        https://sweetalert2.github.io/
    axios
    https://github.com/axios/axios

Capitulo 61:
    Iconos
    https://fontawesome.com/
    https://html2jade.org/

Capitulo 73:
    Hash password con Nodejs
    https://www.npmjs.com/package/bcrypt
    npm install --save bcrypt-nodejs

Capitulo 74:
    Validar formulario Crear Cuentas
    https://www.npmjs.com/package/connect-flash
    npm install --save connect-flash

Nota: no se cuando lo instalo a expressValidator, istalar la @5.3.1, las más nuevas funcionan diferente y da error
    https://express-validator.github.io/docs/
    npm install --save express-validator@5.3.1 

Capitulo 76:
    npm install --save cookie-parser express-session

Capitulo 79:
    Instalar y configurar Passport
    http://www.passportjs.org/
    http://www.passportjs.org/packages/passport-local/
    npm install passport-local
    
Capitulo 93:
    Instalar NodeMailer y crear cuenta MailTrap
    https://nodemailer.com/about/
    https://mailtrap.io/
    npm install --save nodemailer juice html-to-text


Capitulo 100:
    Creando variables de entorno para la Base de Datos
    npm install --save dotenv

Capitulo 103:
    Creamos un repositorio en Heroku
    heroku create --remote production
    Subimos el repositorio de código que está en github a Heroku
    git push production master

Capitulo 104:
    Crear Base de datos en Heroku
    Para saber el link a la base de datos, en Heroku -> Settings -> Config Vars o en la consola
    heroku config | grep CLEARDB_DATABASE_URL
    Configuramos la base de datos en Heroku en consola:
    heroku config:set DB_NOMBRE=heroku_Nombre_de_base_datos
    Otra Forma, en la Web de Heroku, con ADD, agregamos una variable llamada DB_NOMBRE y el valor heroku_Nombre_de_base_datos
    Hacemos lo mismo:
    - para el usuario DB_USER y el password DB_PASS 
    - Host heroku config:set DB_HOST=Nombre_del_host_de_heroku
    - Puerto heroku config:set DB_PORT=3306 
