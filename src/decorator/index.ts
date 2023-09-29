// 权限装饰器
export function permission(role: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (role === "1") {
        return originalMethod.apply(this, args);
      } else {
        throw new Error("You do not have permission to perform this action");
      }
    };

    return descriptor;
  };
}
