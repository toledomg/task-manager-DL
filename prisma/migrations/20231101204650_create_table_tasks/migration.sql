-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks_users" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "users_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
