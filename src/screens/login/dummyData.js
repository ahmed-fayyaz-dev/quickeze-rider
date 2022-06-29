import { faker } from '@faker-js/faker';

export const dummyUser = {
    user: {
        id: faker.datatype.uuid(),
        status: 0,
        profileUrl: faker.image.avatar(),
        name: faker.name.findName(),
        email: 'dummy@mail.com',
        phoneNumber: faker.phone.phoneNumber(),
        images: {
            cnic: faker.image.avatar(),
            doc: faker.image.business(),
            vehicle: [
                faker.image.transport,
                faker.image.transport,
                faker.image.transport,
                faker.image.transport,
            ],
        },
    },
    status: 'success',
};
