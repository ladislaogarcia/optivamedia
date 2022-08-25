<!-- markdownlint-disable MD001 MD033-->
# Simple Graphic Cards Application

This is a technical challenge developed with NodeJS and Angular.

It is divided into two pieces: server and client.
<br>
<br>

##### **CONTENT TABLE**

1. [Server](#server)
2. [Client](#client)
3. [How to use it](#how-to-use-it)
4. [Dockerize it](#docker)
<br>
<br>

## Server
<span id="server"></div>
This is an application developed only with NodeJS using the 'http' module to create a simple JSON server. Simple to manage, too.

- NodeJS **'http'** module: https://nodejs.org/api/http.html
<br>
<br>
More detailed information can be found here: [Server Docs](/server/README.md)

## Client

This is an application developed under Angular framework: https://angular.io

- **_RxJS_** is used for manage the asynchronous behaviours: <https://rxjs.dev/>
- **_NgRx_** is used for manage the application state: <https://ngrx.io/>

## HOW TO USE IT
<div id="how-to-use-it"></div>

### **NAVIGATE TO PROJECT FOLDER**
1. Go to the root folder of the project

### **INSTALL DEPENDENCIES**
2. Type this in a terminal. It will install all the dependencies: **npm run prepare**

### **BUILD**
3. Now we can build the server and the client: **npm run build**

### **RUN THE SERVER AND THE CLIENT**
5. First, we have to turn on the server: **npm run server:start** 
6. And now, **WE HAVE TO OPEN ANOTHER TERMINAL** and type this: **npm run client:start**

By default, the Server with the API uses to run on port 3003:
*http://localhost:3003*

But that url is inactive. We have to point to:
**http://localhost:3003/graphic-cards**

Client application, as always with Angular SSR, is in: **http://localhost:4000/**

**NOT PORT 4200 - THAT IS FOR DEVELOPMENT PURPOUSES ONLY**

Now, we have working an small API created only with NodeJS native and an Angular application rendered with Universal (SSR).

Any question or doubt, do not hesitate to reach me.

### **HOW TO TEST**

We have to more npm scripts to know:
<br/><br/>
**npm run server:test**: Run the server unit test
<br>
**npm run client:test**: Run the client unit test
<br>

There is few more ones in 'package.json' file.

For **linting** (ESLint) or **code formatting** (Prettier), by an instance.
All the scripts ending in ':fix' means that script will make some job if you run it. Lint scripts with ':fix' fixes automatically the errors.

Or the code formating. If you run the ones whose ending in ':fix' it will also format the code, not just checking it.
## Dockeize it
<span id="docker"></div>
**REQUIREMENTS**
1. It is required to have installed these softwares:
- NodeJS: https://nodejs.org/
- Docker: https://www.docker.com/

Now, we can deploy them into contaiers, one for each.
Also, it can be done in two ways:
<br/>
### 1. Together
Within the root project, there is a '**docker-compose.yml**' file, which will manage everything for us. We will only have to do is typing a script in a terminal:
```bash
docker-compose up
```
It will build two Docker images: one for the server and another one for the client. They will call: '**server**' and '**client**'

### 2. Separately
If it is required, we can deploy them individually.
We have to do a task in both directories ('**server**' and '**client**'). Almost the same.

1. Go into the directory '**server**' over a terminal.
2. Type this:
```bash
docker run -p 3003:3003 --name app1 appserver:1.0.
```
**Port 3003** is the default port. If it is changed, this has to be changed too. Mapping the server port with the same port in the container.
3. Go into the directory '**server**' over a terminal.
2. Type this:
```bash
docker run -p 4000:4000 --name <container_name> <image_name>
```
**Port 4000** is the default port for Angular Universal SSR Applications. If it is changed, this has to be changed too. Mapping the server port with the same port in the container.

Afterwards, there is only needed to open a web browser and navigate to:
- http://localhost/3003 : Where we will have exposed our API
- http://localhost/4000 : Where it will be exposed or Angular application. (SSR)