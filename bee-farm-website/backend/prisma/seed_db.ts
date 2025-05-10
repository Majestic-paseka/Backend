import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  const userId = Math.floor(Math.random() * 4) + 2;

  const beeBreeds = [
    'Карника',
    'Бакфаст',
    'Итальянская',
    'Среднерусская',
    'Кавказская серая',
    'Украинская степная',
    'Краинская',
    'Кубанская',
    'Фараонова',
    'Анатолийская'
  ];
  const beeSpecies = [
    'Apis mellifera'           // Западная медоносная пчела
    , 'Apis cerana'            // Восточная медоносная пчела
    , 'Apis dorsata'           // Гигантская пчела
    , 'Apis florea'            // Карликовая пчела
    , 'Apis andreniformis'     // Черная карликовая пчела
    , 'Bombus terrestris'      // Земляной шмель (крупная пчела-шмель)
    , 'Trigona spinipes'       // Безжальная пчела
    , 'Melipona beecheii'      // Безжальная медоносная пчела Центральной Америки
    , 'Euglossa dilemma'       // Орхидейная пчела
    , 'Xylocopa virginica'     // Пчела-плотник
  ];

  const plantNames = [
  'Липа', 'Акация белая', 'Фацелия', 'Люцерна', 'Клевер белый',
  'Мальва лесная', 'Гречиха', 'Эспарцет', 'Синяк обыкновенный', 'Тимьян',
  'Пижма', 'Кипрей', 'Кориандр', 'Мелисса', 'Мята перечная',
  'Подсолнечник', 'Рапс', 'Чабрец', 'Марь белая', 'Череда',
  'Горчица белая', 'Люпин', 'Ноготки', 'Одуванчик', 'Календула',
  'Вереск', 'Ромашка аптечная', 'Донник белый', 'Сурепка', 'Календула лекарственная',
  'Шалфей луговой', 'Будра плющевидная', 'Змееголовник', 'Топинамбур', 'Фенхель',
  'Тыква', 'Артишок', 'Клевер красный', 'Вика', 'Горец птичий',
  'Редька масличная', 'Марь душистая', 'Цикорий', 'Марь красная', 'Лён масличный',
  'Бурачок', 'Капуста кормовая', 'Гречиха татарская', 'Горох', 'Амарант',
  'Чина луговая', 'Золотарник'
];

const plantSpecies = [
  'Tilia cordata', 'Robinia pseudoacacia', 'Phacelia tanacetifolia', 'Medicago sativa',
  'Trifolium repens', 'Malva sylvestris', 'Fagopyrum esculentum', 'Onobrychis viciifolia',
  'Echium vulgare', 'Thymus serpyllum', 'Tanacetum vulgare', 'Epilobium angustifolium',
  'Coriandrum sativum', 'Melissa officinalis', 'Mentha piperita', 'Helianthus annuus',
  'Brassica napus', 'Thymus vulgaris', 'Chenopodium album', 'Bidens tripartita',
  'Sinapis alba', 'Lupinus polyphyllus', 'Calendula officinalis', 'Taraxacum officinale',
  'Calluna vulgaris', 'Matricaria chamomilla', 'Melilotus albus', 'Barbarea vulgaris',
  'Salvia pratensis', 'Glechoma hederacea', 'Dracocephalum moldavica', 'Helianthus tuberosus',
  'Foeniculum vulgare', 'Cucurbita pepo', 'Cynara scolymus', 'Trifolium pratense',
  'Vicia sativa', 'Polygonum aviculare', 'Raphanus sativus', 'Dysphania ambrosioides',
  'Cichorium intybus', 'Amaranthus retroflexus', 'Linum usitatissimum', 'Alyssum saxatile',
  'Brassica oleracea', 'Fagopyrum tataricum', 'Pisum sativum', 'Amaranthus hypochondriacus',
  'Lathyrus pratensis', 'Solidago canadensis'
];

const sowingPurposes = [
  'Медоносное', 'Кормовое', 'Лекарственное', 'Декоративное',
  'Сидерат', 'Противоэрозионное', 'Укрепление почвы', 'Мульчирующее',
  'Ароматическое', 'Плодово-ягодное'
];

  // Удаление всех данных, кроме пользователей
  await prisma.beeFamilyYard.deleteMany();
  await prisma.honeyPlantYard.deleteMany();
  await prisma.productivity.deleteMany();
  await prisma.inspection.deleteMany();
  await prisma.monthlyFamilyCount.deleteMany();
  await prisma.malliferousPlant.deleteMany();
  await prisma.beeFamily.deleteMany();

  // BeeFamily
await prisma.beeFamily.createMany({
  data: Array.from({ length: 24 }, (_, i) => ({
    user_id: Math.floor(Math.random() * 4) + 2,
    beefamily_number: `Семья №${i + 1}`,
    queen_birth_year: 2020 + (i % 4),
    mother_family: `Материнская ${i + 1}`,
    queen_breed: beeBreeds[Math.floor(Math.random() * beeBreeds.length)],
    queen_line: beeSpecies[Math.floor(Math.random() * beeSpecies.length)],
    createdAt: getRandomDate(new Date(2024, 0, 1), new Date(2025, 11, 31)), // случайная дата
  })),
});

  // MalliferousPlant
  await prisma.malliferousPlant.createMany({
    data: Array.from({ length: 52 }, (_, i) => ({
      plant_name: plantNames[i % plantNames.length],
      plant_species: plantSpecies[i % plantSpecies.length],
      honey_price: Math.round(30 + Math.random() * 70), // от 30 до 100
      start_blooming: new Date(2024, 3 + (i % 4), 1 + (i % 10)), // апрель–июль
      end_blooming: new Date(2024, 4 + (i % 4), 10 + (i % 10)),
      purpose_of_sowing: sowingPurposes[i % sowingPurposes.length],
      honey_productivity: 8 + (i % 6) * 4, // от 8 до 28
      createdAt: new Date(2024, 2 + (i % 6), 1 + i),
    })),
  });

  // Получаем ID для дальнейших вставок
  const beeFamilies = await prisma.beeFamily.findMany({
    orderBy: { beefamily_id: 'asc' },
  });

  const plants = await prisma.malliferousPlant.findMany({
    orderBy: { plant_id: 'asc' },
  });

  // Inspection
  await prisma.inspection.createMany({
    data: beeFamilies.map((family, i) => ({
      beefamily_id: family.beefamily_id,
      data_of_inspection: new Date(2024, 4, 10 + i),
      power_of_family: 5 + (i % 3),
      total_frames: 10 + i,
      brood_frames: 5 + (i % 5),
      notes_of_inspection: `Примечания осмотра ${i + 1}`,
      notes_what_to_do: `Что сделать ${i + 1}`,
    })),
  });


  // Productivity
  await prisma.productivity.createMany({
    data: Array.from({ length: 24 }, (_, i) => ({
      productivity_year: 2021 + (i % 3),
      productivity_date: new Date(2024, 6, i + 1),
      beefamily_id: beeFamilies[i % beeFamilies.length].beefamily_id,
      honey_kg: (i + 1) * 3.4,
      wax_kg: (i + 1) * 0.5,
      swarming_rate: i % 4,
      number_of_nucs: 1 + (i % 2),
      wintering_notes: `Заметки зимовки ${i + 1}`,
    })),
  });

// HoneyPlantYard (как раньше, создаёт 24 участка)
await prisma.honeyPlantYard.createMany({
  data: beeFamilies.map((_, i) => ({
    plant_id: plants[i % plants.length].plant_id,
    yard_honey_productivity: (i + 1) * 5.2,
    area: (i + 1) * 1.5,
    wheather_conditions: `Погода ${i + 1}`,
    notes: `Заметки пасеки ${i + 1}`,
  })),
});

const yards = await prisma.honeyPlantYard.findMany({
  orderBy: { yard_id: 'asc' },
});

// BeeFamilyYard (один к одному)
await prisma.beeFamilyYard.createMany({
  data: beeFamilies.map((family, i) => ({
    beefamily_id: family.beefamily_id,
    yard_id: yards[i % yards.length].yard_id,
    start_date: new Date(2024, 4, 1 + i),
    end_date: new Date(2024, 4, 5 + i),
  })),
});


  // MonthlyFamilyCount
  await prisma.monthlyFamilyCount.createMany({
    data: Array.from({ length: 10 }, (_, i) => ({
      user_id: userId,
      year: 2023,
      month: i + 1,
      family_count: 5 + i,
      notes: `Отчет за ${i + 1} месяц`,
    })),
  });

  console.log('✅ Данные успешно добавлены');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
