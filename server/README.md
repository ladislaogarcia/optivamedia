# JSON Server

This is a simple json server developed with NodeJS and its 'http' module:
<br>

- NodeJS: https://nodejs.org/
- NodeJS **'http'** module: https://nodejs.org/api/http.html
  <br>
  It creates a HTTP Server that only responds json format files, wrapping it for give it a more easy way to work with.
  <br>
  <br>

##### **CONTENT TABLE**

1. [How to start](#how-to-start)
2. [Options](#options)
3. [Server Configuration](#server-configuration)
4. [Methods](#methods)
5. [Endpoints Creation](#endpoints-creation)
6. [Example](#example)
   <br>
   <br>

### **HOW TO START**

<span id="how-to-start"></span>

1. First of all, you have to **import the script from the 'dist/' folder**. There are two files you can import:

   | filename          | size | description                                     |
   | ----------------- | :--: | ----------------------------------------------- |
   | JSONServer.js     |  6k  | Server class with the source code as it is      |
   | JSONServer.min.js |  3k  | Server class with the source code **mininized** |

2. Create a class instance.
3. Set-up ( if you want ) the server with the options.
   <br>
   <br>

---

### **OPTIONS**

---

<br>
This options can be supplied by a file called 'server.config.json' placed into the project root folder or by an object passed when creating the server.
<br>
<br>

| option         | type     | required | default            |
| -------------- | -------- | -------- | ------------------ | ------------------------------------------------------------- |
| port           | number   | No       | 8081               | Port used by the server                                       |
| methodsAllowed | string[] | No       | ["OPTIONS", "GET"] | Methods allowed by server\*                                   |
| jsonPath       | string   | Yes      | ""                 | Path where the server will find the json files                |
| responseCodes  | Object[] | No       | _(see below)_      | Array of objects with http codes defintions for the responses |

<small>\* Also, it has to be a json file created in the correct folder. See below</small>
<br>
<br>

---

#### **Default responseCodes**

---

```json
{
  "200": {
    "error": false,
    "statusCode": 200,
    "message": "OK"
  },
  "404": {
    "error": true,
    "statusCode": 404,
    "message": "Not found"
  },
  "405": {
    "error": true,
    "statusCode": 405,
    "message": "Method Not-Allowed"
  },
  "503": {
    "error": true,
    "statusCode": 503,
    "message": "Service unavailable"
  }
}
```

<br>

---

### **SERVER CONFIGURATION**

---

<span id="server-configuration"></span>
There is many ways that allow you to configure the server. Exactly, there are three.

1. Configuration passed throught the constructor when the server class is instanced.
2. Configuration file called 'server.config.js' in the root folder of the project
3. No configuration at all. The server will take the default one.
<div style="background: purple; height: 4rem; line-height: 4rem;">
<div style="font-size: 14px; line-height: 1.5rem; margin: 20px; font-weight: 500; position: relative; top: .5rem;">
IMPORTANT !!! The server takes in preferences order that one. It allows to create more than one server with different configurations.
</div>
</div>
<br>
<br>

---

### **METHODS**

---

<span id="methods"></span>
| Name | Description |
|-------|-------------|
| start() | Start the server |
| stop() | Stop the server\* |

<small>\* Useful for testing purposes</small>
<br>
<br>

---

### **ENDPOINTS CREATION**

---

<span id="endpoints-creation"></span>
Create an endpoint for send json in the responses is very easy. There are only needed two easy steps:

1. Have the request method included into the 'methodsAllowed' option.
2. Have a json file hosted in a directory which has to meet the following pattern:

```code
  {jsonPath}/{method}/{method}-{endpoint}
```

**method** has to be in lowercase.

**endpoint** has to be in lowercase, too. But it has not to have blank spaces. Better hyphens and dashes.
<br>
<br>

### **Example:**

<span id="example"></span>
Figure out that you want to implement the request for the method GET and endpoint 'graphic-cards'. Also, we have configured the server with the 'jsonPath' property with the value of './responses';

1. First, you have to be safe about GET method is allowed in the configuration of the server.

2. Then, you must put a file in the './responses/get/' directory with the filename 'get-graphic-cards.json'

3. Create and start the server:

   ```javascript
   const JSONServer = require('JSONServer'); // Requiring the class file
   const server = new JSONServer();
   ```

   If we want to pass a configuration:

   ```javascript
   const JSONServer = require('JSONServer'); // Requiring the class file
   const configOverride = { port: 4500 };
   const server = new JSONServer(configOverride);
   ```

4. Now, a request is made and the server will get the request, check that GET method is allowed and it will look for a file called 'get-graphic-cards.json' into the jsonPath folder, and inside, a folder with the method name.

   In this case the path and the filename would be: "./responses/get/get-graphic-cards.json".
