create table users(
    id bigint not null auto_increment,
    email varchar(255) not null,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    pass varchar(25) not null,
    produced_energy DECIMAL(30, 10),
    consumed_energy DECIMAL(30, 10),
    primary key (id));

alter table users add constraint unique (email);