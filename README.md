# grpc-server

----
> grpc-server is a wrapper around official [grpc](https://www.npmjs.com/package/grpc) package. It handles multiple proto files for various grpc clients. Sometimes multiple clients communicate with the core server. So there are many proto files on the server. This package helps to achieve this functionality quickly and easily.

## PREREQUISITES
- node: This requires node to be installed, version 8.0 or above.

- Note: If you installed node via a package manager and the version is still less than 4.0, try directly installing it from nodejs.org.

## HOW TO RUN?
```
npm run build
npm start
```

## INSTALLATION
```npm install multi-proto-grpc-server```

## Example
####notification.proto

```
syntax = "proto3";

package notification;

service Notification {
  rpc send(Request_Notification) returns (Response_Notification) {}
}

message Request_Notification {
  required string notificationType = 1;
  required string payload = 2;
}

message Response_Notification {
  string response = 1;
}
```

####notification.proto
```
syntax = "proto3";

package notification1;

service Notification1 {
  rpc send1(Request_Notification) returns (Response_Notification) {}
}

message Request_Notification {
  required string notificationType = 1;
  required string payload = 2;
}

message Response_Notification {
  string response = 1;
}
```
#### index.js
```
const { GRPC, ServiceMap } = require('grpc-server');

const serviceContainer = {
  send: (res) => {
  // - - - <code> - - -
    return { response: 'Response' };
  }
}

const serviceContainer1 = {
  send1: (res) => {
    // - - - <code> - - -
    return { response: 'Response1' };
  }
}

const notificationServiceMap = new ServiceMap('notification', serviceContainer);
const notificationServiceMap1 = new ServiceMap('notification', serviceContainer1);

new GRPC([
  { serviceName: 'Notification', PROTO_PATH: './notification.proto', serviceMap: notificationServiceMap.map },
  { serviceName: 'Notification', PROTO_PATH: './notification1.proto', serviceMap: notificationServiceMap1.map }
]).run('0.0.0.0:50051');
```

## Upcoming Features
- Authentication
- grpc-client (sdk for client)