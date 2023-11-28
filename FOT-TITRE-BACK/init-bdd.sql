CREATE TABLE users (
    id_users SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL
);


CREATE TABLE category (
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE picture (
    id_picture SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   size INT NOT NULL,
   mimetype VARCHAR(255) NOT NULL
);


CREATE TABLE article (
    id_article SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    year INT ,
    description VARCHAR(255) ,
    id_category INT not null references category(id_category),
    id_picture INT not null references picture(id_picture)
   
);
   
create table favorite (

id_article INT not null references article(id_article),
id_users INT not null references users(id_users),
primary key (id_article,id_users)
);

insert into picture (name,description, size,mimetype) values ('test','nico','234','tennis');
