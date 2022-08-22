const { createServer } = require('http');
const { existsSync } = require('fs');
const { join, resolve } = require('path');
const colors = require('colors/safe');

const defaultConfig = require('./server.defaults.json');
const instanceConfigFileName = join(process.cwd(), './server.config.json');
const instanceConfig = existsSync(instanceConfigFileName)
  ? require(instanceConfigFileName)
  : [];

class JSONServer {
  instance;
  #FIXED_RESPONSE_CONTENT_TYPE;
  #FIXED_RESPONSE_FILE_EXTENSION;

  /**
   * It defines the configuration, create the server, and add the listeners.
   * IT DOES NOT START THE SERVER. IT HAS TO BE DONE MANUALLY WITH THE start() METHOD.
   * @constructor
   */
  constructor(config) {
    this.config = this.#extends([config || {}, instanceConfig], defaultConfig);
    this.#FIXED_RESPONSE_CONTENT_TYPE = 'application/json';
    this.#FIXED_RESPONSE_FILE_EXTENSION = 'json';
    this.#createServer();
    this.#addListeners();
  }

  /**
   * It overwrites the default server configuration with the properties given.
   * Configuration preferences order: 1. Constructor Object, 2. File Project, 3. Default configuration.
   * @param { Object[] } customObjects Objects array with properties for overwrite.
   * @param { Object } defaultObject Object with all the properties.
   * @returns An array with the default properties overwriten by the customObject properties.
   */
  #extends(customObjects, defaultObject) {
    if (!Array.isArray(customObjects)) customObjects = [customObjects];
    const returnObject = {};
    for (const key in defaultObject) {
      const objectFirst =
        customObjects.find((customObject) => customObject[key]) ||
        defaultObject;
      returnObject[key] = objectFirst[key];
    }
    return returnObject;
  }

  /**
   * It creates the server, managing the requests
   */
  #createServer() {
    this.instance = createServer();
  }

  #writeMessage(message, color) {
    color = color || 'black';
    message = `${message}\r\n`;
    console.log(colors[color](message));
  }

  /**
   * It adds some listeners, giving feedback to the user
   */
  #addListeners() {
    this.instance.on('listening', () => {
      this.#writeMessage(
        'Welcome to JSONServer by Ladislao Garcia, everything was alright.',
        'bgBlue'
      );
      this.#writeMessage(
        `Server is running at http://127.0.0.1:${this.config.port}/`,
        'bgMagenta'
      );
      this.#writeMessage('Press Ctrl + C or Cmd + . if you want to stop it.');
    });

    this.instance.on('request', (req, res) => {
      const endpointRequested = this.#resolvePath(req.url).pathname;
      let returnObject;

      if (!this.#isValidMethod(req.method)) {
        returnObject = this.#getInvalidContentResponse(405);
      } else {
        const endPointContent = this.#getEndpointContent(
          req.method,
          endpointRequested
        );
        returnObject = endPointContent
          ? this.#getValidContentResponse(endPointContent)
          : this.#getInvalidContentResponse(404);
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(returnObject.statusCode, {
        'Content-Type': this.#FIXED_RESPONSE_CONTENT_TYPE
      });
      res.end(JSON.stringify(returnObject));
    });
  }

  /**
   * It starts the server
   */
  start() {
    this.instance.listen(this.config.port);
  }

  /**
   * It stops the server. Useful with 'env' parameter for testing purposes.
   * @param { string } env It is used for testing purposes
   */
  stop(env) {
    this.instance.close(() => {
      if (!env || env !== 'test') {
        this.#writeMessage('Server is stopped', 'bgGreen');
      }
    });
  }

  /**
   * It builds the properly error response code to return
   * @param {number | string} errorCode The http error code to return
   * @returns { object } An object made by the error code requested and details property setted as null
   */
  #getInvalidContentResponse(errorCode) {
    errorCode =
      this.config.responseCodes[errorCode] || this.config.responseCodes[503];
    return {
      ...errorCode,
      details: null
    };
  }

  /**
   * It builds the valid content response to return with the content received     *
   * @param { array } content Content to return into the response
   * @returns { object } An object made by the success code 200 and details property setted as the content received
   */
  #getValidContentResponse(content) {
    return {
      ...this.config.responseCodes[200],
      details: content
    };
  }

  /**
   * Returns if the method passed is valid or not.
   * @param { string } method Request method of which is needed to know if it is valid or not.
   * @returns { boolean } Returns if the request method is valid or not.
   */
  #isValidMethod(method) {
    return this.config.methodsAllowed.includes(method);
  }

  #resolvePath(pathname) {
    return new URL(resolve(pathname));
  }

  /**
   * It builds the name of the json file with the request method and endpoint.
   * @param { string } method Request method
   * @param { string } endpoint Endpoint requested
   * @returns The name of the json file which contains the data required
   */
  #parseEndpointRequested(method, endpoint) {
    if (!this.config.jsonPath || this.config.jsonPath.trim() === '') {
      return false;
    }
    const pathname = this.#resolvePath(this.config.jsonPath).pathname;
    const ret = `${pathname}/${method}/${method}-${endpoint.slice(1)}.${
      this.#FIXED_RESPONSE_FILE_EXTENSION
    }`;
    return ret;
  }

  /**
   * It gets the json file content for the endpoint.     *
   * @param { string } method Request method
   * @param { string } endpoint Endpoint requested
   * @returns The content of the json file which contains the data required
   */
  #getEndpointContent(method, endpoint) {
    const endpointRequested = this.#parseEndpointRequested(
      method.toLowerCase(),
      endpoint
    );
    return endpointRequested && existsSync(endpointRequested)
      ? require(endpointRequested)
      : false;
  }
}

module.exports = JSONServer;
