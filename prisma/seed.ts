import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "Amith",
    email: "amith.ch@outlook.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB seed: Started ...");

  //deletes the existing data in database when the database is seeded again
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  //Using the same password for
  const passwordHash = await hash("Secreat");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  // adding data to database using for loop
  //   for (const ticket of tickets) {
  //     await prisma.ticket.create({
  //       data: ticket,
  //     });
  //   }

  // Alternative way using promises without for loop
  //   const promises = tickets.map((ticket) =>
  //     prisma.ticket.create({
  //       data: ticket,
  //     })
  //   );
  //   await Promise.all(promises);

  // Alternative way using createMAny function that adds all the data at a time
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished in (${t1 - t0}ms)`);
};

seed();
