const JSONServer = require('../src/JSONServer');
const http = require('http');
const { resolve } = require('path');
const { renameSync } = require('fs');

describe('JSON Server Unit Testing', () => {
  let server;
  let responseCodes;

  beforeAll(() => (console.log = jest.fn()));

  beforeEach(() => {
    server = new JSONServer();
    server.config.jsonPath = resolve(__dirname, './mocks');
    responseCodes = server.config.responseCodes;
    server.start();
  });

  afterEach(() => {
    server.stop('test');
    jest.restoreAllMocks();
  });

  describe('Configuration', () => {
    test('It responses a 404 error code if the server does not have the required "jsonPath" property.', () => {
      server.config.jsonPath = '';
      const reqOptions = {
        method: 'GET',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards'
      };
      const req = http.request(reqOptions, (res) => {
        res.on('end', () => {
          expect(parsedData.statusCode).toEqual(404);
          done();
        });
      });
      req.end();
    });

    test('It creates a server just setting the required "jsonPath" property.', () => {
      const reqOptions = {
        method: 'GET',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards'
      };
      const req = http.request(reqOptions, (res) => {
        res.on('end', () => {
          expect(parsedData.details.lenght).toEqual(2);
          expect(parsedData.statusCode).toEqual(200);
          done();
        });
      });
      req.end();
    });

    test('It creates a server with no config file.', () => {
      server.stop('test');
      server = new JSONServer();
      renameSync(
        `${process.cwd()}/server.config.json`,
        `${process.cwd()}/_server.config.json`
      );
      server.start();
      renameSync(
        `${process.cwd()}/_server.config.json`,
        `${process.cwd()}/server.config.json`
      );
      const reqOptions = {
        method: 'GET',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards'
      };
      const req = http.request(reqOptions, (res) => {
        res.on('end', () => {
          expect(parsedData.details.lenght).toEqual(2);
          expect(parsedData.statusCode).toEqual(200);
          done();
        });
      });
      req.end();
    });
  });

  describe('HTTP Codes and Responses', () => {
    test('It retrieves data and returns success code 200 when the endpoint is registered...', (done) => {
      const reqOptions = {
        method: 'GET',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards'
      };
      const req = http.request(reqOptions, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(rawData);
          expect(parsedData.details).toBeTruthy();
          expect(parsedData.statusCode).toEqual(200);
          done();
        });
      });

      req.end();
    });

    test('It returns error code 404 if the endpoint is not registered...', (done) => {
      const reqOptions = {
        method: 'GET',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards-2'
      };
      const req = http.request(reqOptions, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(rawData);
          expect(parsedData.statusCode).toEqual(404);
          expect(parsedData.details).toBeFalsy();
          done();
        });
      });
      req.end();
    });

    test('It returns error code 405 if the request method is not allowed...', (done) => {
      const reqOptions = {
        method: 'POST',
        host: 'localhost',
        port: server.config.port,
        path: '/graphic-cards'
      };
      const req = http.request(reqOptions, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(rawData);
          expect(parsedData.statusCode).toEqual(405);
          expect(parsedData.details).toBeFalsy();
          done();
        });
      });
      req.end();
    });
  });
});
