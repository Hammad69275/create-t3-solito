import bcrypt from 'bcrypt';

import prisma from '..';

const password = bcrypt.hashSync('password', 10);

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password
    }
  });

  console.log('Seed data created:');
  console.log({ user1, user2 });
}

main()
  .then(async () => {
    console.log('Seed completed.');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error during seeding:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
