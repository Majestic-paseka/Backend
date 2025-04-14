-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "BeeFamily" (
    "beefamily_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "beefamily_number" VARCHAR(50) NOT NULL,
    "queen_birth_year" INTEGER,
    "mother_family" VARCHAR(50),
    "queen_breed" VARCHAR(50),
    "queen_line" VARCHAR(50),

    CONSTRAINT "BeeFamily_pkey" PRIMARY KEY ("beefamily_id")
);

-- CreateTable
CREATE TABLE "MalliferousPlant" (
    "plant_id" SERIAL NOT NULL,
    "plant_name" VARCHAR(100) NOT NULL,
    "plant_species" VARCHAR(100),
    "honey_price" DECIMAL(10,2),
    "start_blooming" TIMESTAMP(3),
    "end_blooming" TIMESTAMP(3),
    "purpose_of_sowing" VARCHAR(255),
    "honey_productivity" DECIMAL(10,2),

    CONSTRAINT "MalliferousPlant_pkey" PRIMARY KEY ("plant_id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "inspection_id" SERIAL NOT NULL,
    "beefamily_id" INTEGER NOT NULL,
    "data_of_inspection" TIMESTAMP(3) NOT NULL,
    "power_of_family" INTEGER,
    "total_frames" INTEGER,
    "brood_frames" INTEGER,
    "notes_of_inspection" TEXT,
    "notes_what_to_do" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("inspection_id")
);

-- CreateTable
CREATE TABLE "Productivity" (
    "productivity_id" SERIAL NOT NULL,
    "productivity_year" INTEGER NOT NULL,
    "productivity_date" TIMESTAMP(3),
    "beefamily_id" INTEGER NOT NULL,
    "honey_kg" DECIMAL(10,2),
    "wax_kg" DECIMAL(10,2),
    "swarming_rate" INTEGER,
    "number_of_nucs" INTEGER,
    "wintering_notes" TEXT,

    CONSTRAINT "Productivity_pkey" PRIMARY KEY ("productivity_id")
);

-- CreateTable
CREATE TABLE "HoneyPlantYard" (
    "yard_id" SERIAL NOT NULL,
    "plant_id" INTEGER,
    "yard_honey_productivity" DECIMAL(10,2),
    "area" DECIMAL(10,2),
    "wheather_conditions" TEXT,
    "notes" TEXT,

    CONSTRAINT "HoneyPlantYard_pkey" PRIMARY KEY ("yard_id")
);

-- CreateTable
CREATE TABLE "BeeFamilyYard" (
    "beefamily_id" INTEGER NOT NULL,
    "yard_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "BeeFamilyYard_pkey" PRIMARY KEY ("beefamily_id","yard_id")
);

-- CreateTable
CREATE TABLE "MonthlyFamilyCount" (
    "count_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "family_count" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "MonthlyFamilyCount_pkey" PRIMARY KEY ("count_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BeeFamily" ADD CONSTRAINT "BeeFamily_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_beefamily_id_fkey" FOREIGN KEY ("beefamily_id") REFERENCES "BeeFamily"("beefamily_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productivity" ADD CONSTRAINT "Productivity_beefamily_id_fkey" FOREIGN KEY ("beefamily_id") REFERENCES "BeeFamily"("beefamily_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoneyPlantYard" ADD CONSTRAINT "HoneyPlantYard_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "MalliferousPlant"("plant_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeeFamilyYard" ADD CONSTRAINT "BeeFamilyYard_beefamily_id_fkey" FOREIGN KEY ("beefamily_id") REFERENCES "BeeFamily"("beefamily_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeeFamilyYard" ADD CONSTRAINT "BeeFamilyYard_yard_id_fkey" FOREIGN KEY ("yard_id") REFERENCES "HoneyPlantYard"("yard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyFamilyCount" ADD CONSTRAINT "MonthlyFamilyCount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
