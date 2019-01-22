type Constructor<T = {}> = new (...args: any[]) => T;

class GrpcServiceMap {
  private authenticateGrpcRequest(token: string) {

  }
  public serviceName;
  public serviceContainer;
  public map = {};
  constructor(serviceName: string, serviceContainer: any) {
    this.serviceName = serviceName;
    this.serviceContainer = serviceContainer;
    Object.keys(serviceContainer).forEach(key => {
      this.map[key] = async (call, callback) => {
        const response = await serviceContainer[key](call, callback);
      }
    });
  }
}

function CustomServiceMap<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    
  }
}

const ServiceMap = CustomServiceMap(GrpcServiceMap);

export { ServiceMap };