
create sequence wallet_number_seq
                 increment 1
                 minvalue  8000000000000
                 start     8000000000000;


create table exchange_rates(
	id BIGSERIAL primary key,
	base_currency VARCHAR not null,
	target_currency VARCHAR not null,
	rate numeric not null,
	rate_date DATE not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);

create table users(
	id BIGSERIAL primary key,
	username VARCHAR not null,
	email VARCHAR UNIQUE not null,
	profile_image VARCHAR,
	password VARCHAR not null,
	gacha_chance INT not null default 0,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);

 
create table wallets(
	id BIGSERIAL primary key,
	user_id BIGINT not null,
	balance numeric default 0,
	wallet_number bigint default nextval('wallet_number_seq'),
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ,
	foreign key (user_id) references users(id)
);




  
create table password_tokens(
	id BIGSERIAL primary key,
	user_id BIGINT not null,
	reset_token_number UUID default gen_random_uuid() not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);



create table transaction_categories(
	id BIGSERIAL primary key,
	name VARCHAR not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);


create table source_funds(
	id BIGSERIAL primary key,
	name VARCHAR not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);


create table prizes(
	id BIGSERIAL primary key,
	prize_number INT unique not null,
	prize_amount numeric not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ
);


create table gacha_histories(
	id BIGSERIAL primary key,
	user_id BIGINT not null,
	prize_id INT not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ,
	foreign key (user_id) references users(id),
	foreign key (prize_id) references prizes(id)
);


create table transaction_histories(
	id BIGSERIAL primary key,
	user_id BIGINT not null,
	transaction_category_id INT not null,
	source_fund_id INT not null,
	description text,
	amount numeric not null,
	transaction_time TIMESTAMPTZ default NOW(),
	recipient VARCHAR not null,
	created_at TIMESTAMPTZ default NOW(),
	updated_at TIMESTAMPTZ default NOW(),
	deleted_at TIMESTAMPTZ,
	foreign key (user_id) references users(id),
	foreign key (transaction_category_id) references transaction_categories(id),
	foreign key (source_fund_id) references source_funds(id)
);

insert into users(username, profile_image, email, password)
values 
	('user1', 'https://evqrdlwphgtlcoafoaas.supabase.co/storage/v1/object/public/ewalletapp/profile-pictures/dummyPp.jpg', 'user1@mail.com', '$2a$12$2XvhkL9flrf8ZguSrHR8M.so6lgXrEz2YVPHh//49nf5KuWQcznI.'),
	('yunus granger', '', 'yunus@mail.com', '$2a$12$WsyhnJ/lUSJRk.2N9lirl.EHQAHMxntdwVXPSq2e1A5rtpiq9XLpm'),
	('rio deterjen', '', 'rio@mail.com', '$2a$12$8KH8Tkp2AStBP5UEcCDU4Oc6HURe.R6cXRJTGRRDNVUK5AHXPL5qy'),
	('ino maheswara', '', 'ino@mail.com', '$2a$12$oQ/KSe8TTXKq1DYWOkbTgO7h68pfVgbtbRfTJBLe0DEArTR/zRhke'),
	('bryan tikitaka', '', 'bryan@mail.com', '$2a$12$tM7H9/McRkxFo3DhwrzHsugzCtW5Day/Ui5Odw8C/YPs81nuNLlg.');
	-- ('rian sigma', 'rian@mail.com', '$2a$12$hswbpIz0LBtrn7Q7bUKnkOjA0gcNmjDu9KgJ5uMUDsVJ43XhRNbKS');

insert into prizes(prize_number, prize_amount)
values
	(1, 10000),
	(2, 20000),
	(3, 30000),
	(4, 40000),
	(5, 50000),
	(6, 60000),
	(7, 70000),
	(8, 80000),
	(9, 90000);

insert into wallets(user_id, balance)
values
	(1, 100000),
	(2, 100000),
	(3, 100000),
	(4, 100000),
	(5, 100000);

	
insert into transaction_categories(name)
values
	('transfer'),
	('top up');

insert into source_funds (name)
values
	('e-wallet'),
	('bank transfer'),
	('credit card'),
	('cash'),
	('reward');



insert into transaction_histories(user_id ,transaction_category_id ,source_fund_id ,description ,amount ,recipient ,transaction_time , created_at ,updated_at )
values
(1, 1, 1, 'transfer', 10000, (select users.username  from  users where id = 2), NOW()-interval '15 months', NOW()-interval '15 months', NOW()-interval '15 months'),
(1, 1, 1, 'transfer', 10000, (select users.username  from  users where id = 3), NOW()-interval '12 months', NOW()-interval '12 months', NOW()-interval '12 months'),
(1, 2, 2, 'top-up from bank x', 10000, (select users.username  from  users where id = 1), NOW()-interval '9 months', NOW()-interval '9 months', NOW()-interval '9 months'),
(1, 2, 3, 'top-up from visa x', 10000, (select users.username  from  users where id = 1), NOW()-interval '6 months', NOW()-interval '6 months', NOW()-interval '6 months'),
(2, 1, 1, 'transfer', 20000, (select users.username  from  users where id = 4), NOW()-interval '15 months', NOW()-interval '15 months', NOW()-interval '15 months'),
(2, 1, 1, 'transfer', 20000, (select users.username  from  users where id = 5), NOW()-interval '12 months', NOW()-interval '12 months', NOW()-interval '12 months'),
(2, 2, 4, 'top-up from cash', 20000, (select users.username  from  users where id = 2), NOW()-interval '9 months', NOW()-interval '9 months', NOW()-interval '9 months'),
(2, 2, 5, 'top-up from reward', 20000, (select users.username  from  users where id = 2), NOW()-interval '6 months', NOW()-interval '6 months', NOW()-interval '6 months'),
(3, 1, 1, 'transfer', 30000, (select users.username  from  users where id = 1), NOW()-interval '15 months', NOW()-interval '15 months', NOW()-interval '15 months'),
(3, 1, 1, 'transfer', 30000, (select users.username  from  users where id = 2), NOW()-interval '12 months', NOW()-interval '12 months', NOW()-interval '12 months'),
(3, 2, 2, 'top-up from bank y', 30000, (select users.username  from  users where id = 3), NOW()-interval '9 months', NOW()-interval '9 months', NOW()-interval '9 months'),
(3, 2, 3, 'top-up from visa y', 30000, (select users.username  from  users where id = 3), NOW()-interval '6 months', NOW()-interval '6 months', NOW()-interval '6 months'),
(4, 1, 1, 'transfer', 40000, (select users.username  from  users where id = 2), NOW()-interval '15 months', NOW()-interval '15 months', NOW()-interval '15 months'),
(4, 1, 1, 'transfer', 40000, (select users.username  from  users where id = 3), NOW()-interval '12 months', NOW()-interval '12 months', NOW()-interval '12 months'),
(4, 2, 4, 'top-up from cash', 40000, (select users.username  from  users where id = 4), NOW()-interval '9 months', NOW()-interval '9 months', NOW()-interval '9 months'),
(4, 2, 5, 'top-up from reward', 40000, (select users.username  from  users where id = 4), NOW()-interval '6 months', NOW()-interval '6 months', NOW()-interval '6 months'),
(5, 1, 1, 'transfer', 50000, (select users.username  from  users where id = 3), NOW()-interval '15 months', NOW()-interval '15 months', NOW()-interval '15 months'),
(5, 1, 1, 'transfer', 50000, (select users.username  from  users where id = 4), NOW()-interval '12 months', NOW()-interval '12 months', NOW()-interval '12 months'),
(5, 2, 2, 'top-up from bank z', 50000, (select users.username  from  users where id = 5), NOW()-interval '9 months', NOW()-interval '9 months', NOW()-interval '9 months'),
(5, 2, 3, 'top-up from visa y', 50000, (select users.username  from  users where id = 5), NOW()-interval '6 months', NOW()-interval '6 months', NOW()-interval '6 months');

















		