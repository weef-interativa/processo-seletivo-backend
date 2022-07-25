import { ApiBody } from '@nestjs/swagger';

export const UpdateEventFormDto =
  (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          date: { type: 'Date' },
          city: { type: 'string' },
          state: { type: 'string' },
          address: { type: 'string' },
          complement: { type: 'string' },
          responsible: { type: 'string' },
          phone: { type: 'string' },
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
