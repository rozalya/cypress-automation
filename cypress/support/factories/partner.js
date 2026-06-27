import { faker } from '@faker-js/faker';

export const generatePartner = () => {
  return {
    name: faker.company.name(),   
    address: 'Manastirski Livadi, blvd. "Bulgaria" 69, 1404 Sofia, Bulgaria',
    phone: faker.phone.number(),
    contact: faker.person.fullName(),
    description: faker.lorem.sentence(5),
  };
};