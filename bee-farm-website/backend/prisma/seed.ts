import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = 'password123';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.createMany({
    data: [
      {
        full_name: 'Игорь Жидких',
        email: 'y@example.com',
        password_hash: passwordHash,
        phone: '79001112233',
        role: 'USER',
      },
      {
        full_name: 'Дарья Каратеева',
        email: 'darkarat@example.com',
        password_hash: passwordHash,
        phone: '79002223344',
        role: 'USER',
      },
      {
        full_name: 'Евгений Якушев',
        email: 'poltorashka@example.com',
        password_hash: passwordHash,
        phone: '79003334455',
        role: 'USER',
      },
      {
        full_name: 'Екатерина Савина',
        email: 'sav@example.com',
        password_hash: passwordHash,
        phone: '79004445566',
        role: 'USER',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Пользователи успешно добавлены');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
