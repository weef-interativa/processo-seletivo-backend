import { ApiBody } from '@nestjs/swagger';

export const CreateEventFormDto =
  (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      required: false,
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
            type: 'string',
            format: 'binary',
          },
        },
        required: ['name', 'email', 'date', 'city', 'state', 'address', 'responsible', 'phone', 'images'],
      },
    })(target, propertyKey, descriptor);
  };
