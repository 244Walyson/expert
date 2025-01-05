import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDb() {
  try {
    const brands = await prisma.brand.createMany({
      data: [
        { name: "Toyota" },
        { name: "Honda" },
        { name: "Ford" },
        { name: "Chevrolet" },
        { name: "Nissan" },
        { name: "Hyundai" },
        { name: "Volkswagen" },
        { name: "BMW" },
        { name: "Mercedes-Benz" },
        { name: "Audi" },
      ],
    });

    console.log(`${brands.count} brands created`);

    const brandMap: { [key: string]: number } = {};
    for (const name of [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Nissan",
      "Hyundai",
      "Volkswagen",
      "BMW",
      "Mercedes-Benz",
      "Audi",
    ]) {
      const brand = await prisma.brand.findFirst({ where: { name } });
      brandMap[name] = brand!.id;
    }

    const vehicles = await prisma.vehicle.createMany({
      data: [
        {
          name: "Corolla",
          plate: "ABC1234",
          imgUrl:
            "https://images.unsplash.com/photo-1588348371398-0540e7153802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0b24lMjBtYXJ0aW58ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Toyota"],
        },
        {
          name: "Civic",
          plate: "DEF5678",
          imgUrl:
            "https://images.unsplash.com/photo-1588348371398-0540e7153802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0b24lMjBtYXJ0aW58ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Honda"],
        },
        {
          name: "F-150",
          plate: "GHI9012",
          imgUrl:
            "https://images.unsplash.com/photo-1651928977880-ffb2d963b6b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2NhbmlhfGVufDB8fDB8fHww",
          category: "CAMINHAO",
          brandId: brandMap["Ford"],
        },
        {
          name: "Onix",
          plate: "JKL3456",
          imgUrl:
            "https://images.unsplash.com/photo-1588348371398-0540e7153802?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0b24lMjBtYXJ0aW58ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Chevrolet"],
        },
        {
          name: "Sentra",
          plate: "MNO7890",
          category: "CARRO",
          brandId: brandMap["Nissan"],
        },
        {
          name: "Tucson",
          plate: "PQR2345",
          category: "CARRO",
          brandId: brandMap["Hyundai"],
        },
        {
          name: "Golf",
          plate: "STU6789",
          imgUrl:
            "https://images.unsplash.com/photo-1603039548080-d34896eb2e9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwb3BhbGF8ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Volkswagen"],
        },
        {
          name: "X5",
          plate: "VWX3456",
          imgUrl:
            "https://images.unsplash.com/photo-1603039548080-d34896eb2e9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwb3BhbGF8ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["BMW"],
        },
        {
          name: "C-Class",
          plate: "YZA1234",
          imgUrl:
            "https://images.unsplash.com/photo-1603039548080-d34896eb2e9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwb3BhbGF8ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Mercedes-Benz"],
        },
        {
          name: "A4",
          plate: "BCD5678",
          imgUrl:
            "https://images.unsplash.com/photo-1603039548080-d34896eb2e9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hldnJvbGV0JTIwb3BhbGF8ZW58MHx8MHx8fDA%3D",
          category: "CARRO",
          brandId: brandMap["Audi"],
        },
      ],
    });

    console.log(`${vehicles.count} vehicles created`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDb()
  .then(() => console.log("Database seeded successfully!"))
  .catch((error) => console.error("Error during seed:", error));
