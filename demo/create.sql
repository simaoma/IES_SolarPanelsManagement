create table users(
    id bigint not null auto_increment,
    email varchar(255) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    pass varchar(25) not null,
    primary key (id));

alter table users add constraint unique (email);