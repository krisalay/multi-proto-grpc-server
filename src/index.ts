import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { ServiceMap } from './service-map.mixin';

interface INewGrpcObject {
  serviceName: string;
  PROTO_PATH: string;
  serviceMap: any
};

interface IGrpcDefinition {
  packageDefinition: protoLoader.PackageDefinition;
  protoDescription: grpc.PackageDefinition;
  packageDetail: grpc.ServiceDefinition<any>;
  serviceName: string;
  serviceMap: any
}

export { ServiceMap };
export class GRPC {
  private definitionContainer: IGrpcDefinition[] = [];
  
  constructor(private grpcObject: INewGrpcObject[]) {
    grpcObject.forEach(object => {
      this.validateGrpcObject(object);
      const packageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(object.PROTO_PATH, { 
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
       });
      const protoDescription: grpc.PackageDefinition = grpc.loadPackageDefinition(packageDefinition);
      const packageDetail: protoLoader.ServiceDefinition = protoDescription[object.serviceName.toLowerCase()];
      this.definitionContainer.push({ 
        packageDefinition, 
        protoDescription, 
        packageDetail, 
        serviceName: object.serviceName,
        serviceMap: object.serviceMap
      });
    });
  }

  private validateGrpcObject(object: INewGrpcObject): boolean {
    if (!object.serviceName || !object.PROTO_PATH || !object.serviceMap) {
      throw new Error('Invalid object definition. Required fields are (serviceName, PROTO_PATH, serviceMap)');
    }
    if (typeof object.serviceName !== 'string') {
      throw new Error('Invalid service name');
    }
    if (typeof object.PROTO_PATH !== 'string') {
      throw new Error('Invalid PROTO_PATH type');
    }
    return true;
  }

  private getServer(): grpc.Server {
    const server: grpc.Server = new grpc.Server();
    this.definitionContainer.forEach(d => {
      server.addService(d.packageDetail[d.serviceName]["service"], d.serviceMap);
    })
    return server;
  }

  public run(grpcBind: string): void {
    if(!grpcBind || typeof grpcBind !== 'string') {
      throw new Error('Invalid grpc bind');
    }
    console.log('[GRPC] Starting GRPC Server');
    const server: grpc.Server = this.getServer();
    server.bind(grpcBind, grpc.ServerCredentials.createInsecure());
    server.start();
  }
}