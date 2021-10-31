-- Use this script to set up example data in the DB
-- Run on creation of the DB container in development
-- Can use the dbpopulate.js file to generate this SQL
INSERT INTO "Users" ("id","email","verified","pwHash","name","createdAt","updatedAt") VALUES (DEFAULT,'email1@gmail.com',true,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00'),(DEFAULT,'email2@gmail.com',true,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00'),(DEFAULT,'email3@gmail.com',true,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00'),(DEFAULT,'email4@gmail.com',true,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00'),(DEFAULT,'email5@gmail.com',false,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00'),(DEFAULT,'email6@gmail.com',false,'$2b$10$v3qgumBibz8Uouevm5xeTOFWheNtLVRyLeGqp2tZbfdMJ.iHQtgVq','bot','2021-09-24 14:26:11.566 +00:00','2021-09-24 14:26:11.566 +00:00') RETURNING "id","email","verified","pwHash","name","createdAt","updatedAt";
