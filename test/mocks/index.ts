import { CreateEventDto } from './../../src/events/dto/create-event.dto';
import { CreateUserDto } from './../../src/users/dto/create-user.dto';

export const mockedUser: CreateUserDto = {
  username: 'Guilherme',
  password: '1234567',
};

export const mockedUserTwo: CreateUserDto = {
  username: 'GuiMock2',
  password: '14244542',
};

export const mockedEvent: Partial<CreateEventDto> = {
  name: 'teste24',
  eventDate: new Date('2050-01-10'),
  responsible: 'Gui',
  email: 'gui.wustro@gmail.com',
  phone: '47 996593527',
  zipCode: '89820-000',
  state: 'SC',
  city: 'Cidade',
  street: 'Rua fernando de noronha',
  number: 288,
};

export const mockedEventWithWrongDate: Partial<CreateEventDto> = {
  name: 'teste24',
  eventDate: new Date('2022-01-20'),
  responsible: 'Gui',
  email: 'gui.wustro@gmail.com',
  phone: '47 996593527',
  zipCode: '89820-000',
  state: 'SC',
  city: 'Cidade',
  street: 'Rua fernando de noronha',
  number: 288,
};

export const mockedEditEvent: Partial<CreateEventDto> = {
  name: 'teste24',
  email: 'gui.wustro2@gmail.com',
  phone: '47 996593527',
  zipCode: '89820-000',
  state: 'SC',
  city: 'Cidade',
  street: 'Rua dois',
  number: 243,
};
