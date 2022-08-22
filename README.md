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

