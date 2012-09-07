drop table if exists character;
drop table if exists saying;

create table if not exists character (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	type VARCHAR(25)
);

insert into character values (null, 'Guard');

create table if not exists saying (
	id INTEGER PRIMARY KEY,
	content VARCHAR(175),
	
	character_id INTEGER,
	FOREIGN KEY(character_id) REFERENCES character(id)
);