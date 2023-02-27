DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

CREATE TABLE accounts
(
  id                   SERIAL,
  compound_id          VARCHAR(255),
  user_id              INTEGER NOT NULL,
  provider_type        VARCHAR(255) NOT NULL,
  provider_id          VARCHAR(255) NOT NULL,
  provider_account_id  VARCHAR(255) NOT NULL,
  refresh_token        TEXT,
  access_token         TEXT,
  access_token_expires TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE sessions
(
  id            SERIAL,
  user_id       INTEGER NOT NULL,
  expires       TIMESTAMPTZ NOT NULL,
  session_token VARCHAR(255) NOT NULL,
  access_token  VARCHAR(255),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE users
(
  id             SERIAL,
  name           VARCHAR(255),
  email          VARCHAR(255),
  email_verified TIMESTAMPTZ,
  image          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS experiences (
    exp_id SERIAL NOT NULL,
    exp_user_id INT,
    exp_name VARCHAR(50) NOT NULL,
    exp_price NUMERIC(9,2) NOT NULL,
    exp_currency CHAR(3) NOT NULL,
    exp_date DATE NOT NULL,
    PRIMARY KEY (exp_id),
    FOREIGN KEY (exp_user_id) REFERENCES users (id)

);


CREATE UNIQUE INDEX compound_id ON accounts(compound_id);

CREATE INDEX provider_account_id ON accounts(provider_account_id);

CREATE INDEX provider_id ON accounts(provider_id);

CREATE INDEX user_id ON accounts(user_id);

CREATE UNIQUE INDEX session_token ON sessions(session_token);

CREATE UNIQUE INDEX access_token ON sessions(access_token);

CREATE UNIQUE INDEX email ON users(email);

/*
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Soup - Knorr, Chicken Noodle', 380.54, 'UAH', '2023-02-11');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Onions Granulated', 55175.96, 'EUR', '2023-01-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Grouper - Fresh', 74035.78, 'PAB', '2022-06-13');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Octopus', 34701.79, 'CNY', '2023-01-15');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Ginger - Pickled', 82124.75, 'BGN', '2022-08-02');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Oneshot Automatic Soap System', 43700.16, 'EUR', '2022-11-26');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Magnotta - Pinot Gris Sr', 28314.09, 'BRL', '2023-03-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beef - Striploin', 77128.77, 'USD', '2022-12-11');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cheese - Mozzarella, Shredded', 30298.22, 'SEK', '2022-04-14');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Bagel - Whole White Sesame', 16142.94, 'JPY', '2022-09-15');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Red Snapper - Fresh, Whole', 83088.55, 'CNY', '2023-01-05');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Red Pepper Paste', 59596.36, 'BRL', '2022-10-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Carroway Seed', 48630.03, 'PHP', '2022-06-08');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Lentils - Red, Dry', 52536.49, 'IDR', '2023-01-03');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Bread - White Epi Baguette', 8497.65, 'NOK', '2022-11-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Danishes - Mini Raspberry', 48574.56, 'PLN', '2023-02-15');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Oil - Avocado', 65474.12, 'MYR', '2022-09-09');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pail With Metal Handle 16l White', 64731.81, 'EUR', '2023-02-28');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Coffee - Hazelnut Cream', 11546.31, 'CNY', '2022-06-24');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Pinot Noir Mondavi Coastal', 1925.93, 'ARS', '2022-09-12');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - White, Gewurtzraminer', 36474.79, 'CAD', '2023-02-18');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pasta - Fusili, Dry', 20071.48, 'PHP', '2022-07-22');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Bar Mix - Lime', 61568.51, 'PHP', '2022-11-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pepper - Black, Whole', 87776.65, 'CNY', '2022-10-11');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Bread Base - Gold Formel', 9060.58, 'UAH', '2022-10-17');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Potatoes - Peeled', 2785.78, 'RUB', '2022-08-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Foil Wrap', 91816.9, 'IDR', '2022-09-14');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Mushroom - Shitake, Dry', 256.75, 'PHP', '2023-01-31');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Shrimp - 100 / 200 Cold Water', 86800.7, 'RUB', '2022-10-31');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Ham - Proscuitto', 85185.2, 'MNT', '2023-01-31');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Straw - Regular', 98177.79, 'EUR', '2022-08-18');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pesto - Primerba, Paste', 99072.12, 'PHP', '2022-12-28');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pastry - Baked Scones - Mini', 15799.16, 'RUB', '2022-04-28');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Garlic - Elephant', 28152.89, 'EUR', '2022-09-09');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Water - Spring 1.5lit', 95835.79, 'RUB', '2022-05-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Sauce - Ranch Dressing', 95038.69, 'RUB', '2023-03-24');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Kumquat', 19652.99, 'PLN', '2022-12-03');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Mushroom Morel Fresh', 30796.97, 'HRK', '2023-03-26');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Rubyport', 39120.82, 'CLP', '2023-02-17');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Sauce - Salsa', 5778.86, 'EUR', '2022-07-10');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cocktail Napkin Blue', 80039.38, 'PLN', '2022-12-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Apple - Granny Smith', 28321.95, 'EUR', '2022-08-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Veal - Nuckle', 93414.08, 'THB', '2022-09-27');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Tuna - Canned, Flaked, Light', 78239.25, 'RUB', '2022-03-29');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Sauce - Gravy, Au Jus, Mix', 63185.43, 'CNY', '2022-07-05');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Nutmeg - Ground', 92644.03, 'USD', '2023-02-07');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Sauce - Soya, Dark', 7938.42, 'IDR', '2023-03-17');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Madeira', 63131.13, 'BRL', '2022-06-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Fat Bastard Merlot', 11061.17, 'IDR', '2023-04-02');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Venison - Denver Leg Boneless', 30177.79, 'EUR', '2023-03-18');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cheese - Brie', 20856.32, 'PHP', '2023-02-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Danishes - Mini Cheese', 30514.34, 'SEK', '2023-04-03');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beans - Black Bean, Canned', 1132.73, 'PKR', '2022-10-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beer - Guiness', 40023.47, 'CNY', '2022-06-06');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Magnotta - Cab Sauv', 19376.65, 'EUR', '2022-06-11');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Appetizer - Escargot Puff', 11067.91, 'THB', '2022-09-01');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Puree - Pear', 78475.78, 'ARS', '2022-12-10');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Lettuce - California Mix', 41566.36, 'RUB', '2022-04-18');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Snails - Large Canned', 9694.88, 'XOF', '2022-07-22');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Cava Aria Estate Brut', 61101.38, 'JOD', '2023-03-07');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Crab Meat Claw Pasteurise', 53349.4, 'ETB', '2022-09-01');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Scampi Tail', 55597.02, 'EUR', '2022-09-03');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Soup - Campbells Asian Noodle', 97579.88, 'EUR', '2022-06-04');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Butter - Salted', 55645.91, 'BRL', '2022-10-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pike - Frozen Fillet', 62338.7, 'CAD', '2022-04-04');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Seedlings - Clamshell', 80389.07, 'EUR', '2023-03-11');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Apple - Northern Spy', 75331.7, 'JPY', '2022-04-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Chocolate Eclairs', 3229.97, 'PLN', '2023-02-09');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Sake', 39175.7, 'CZK', '2023-01-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Roe - White Fish', 98784.27, 'IDR', '2022-03-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Shrimp - Black Tiger 26/30', 19706.81, 'CNY', '2022-10-20');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - White, Antinore Orvieto', 66407.61, 'XOF', '2022-12-24');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Galliano', 54130.25, 'THB', '2022-12-02');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cherries - Bing, Canned', 91762.71, 'AMD', '2022-10-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Tortillas - Flour, 8', 41618.0, 'IDR', '2022-09-16');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pepper - Cubanelle', 82313.37, 'JPY', '2022-09-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Eggplant - Baby', 94769.77, 'BYR', '2022-05-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beef - Top Butt Aaa', 14389.37, 'MNT', '2022-10-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Celery Root', 75183.32, 'SEK', '2022-06-09');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Syrup - Chocolate', 58789.28, 'UAH', '2022-04-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wine - Cahors Ac 2000, Clos', 26762.3, 'IDR', '2023-01-15');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Parsley - Dried', 55425.74, 'SEK', '2022-06-06');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Longos - Greek Salad', 8909.24, 'BRL', '2022-06-12');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wooden Mop Handle', 80118.54, 'CNY', '2023-02-21');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Mcgillicuddy Vanilla Schnap', 37463.99, 'CRC', '2023-02-27');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Blackberries', 93787.1, 'XOF', '2022-05-15');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pheasants - Whole', 12102.54, 'PYG', '2022-05-02');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beans - French', 58367.2, 'HRK', '2023-04-09');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cheese - Le Cru Du Clocher', 82854.93, 'UAH', '2022-09-30');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Sprouts - Corn', 47265.43, 'CNY', '2022-09-02');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pasta - Fusili Tri - Coloured', 56162.64, 'NGN', '2022-05-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Veal - Ground', 65905.81, 'CNY', '2023-03-08');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Tea - Herbal Sweet Dreams', 23625.43, 'PGK', '2022-10-26');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Wasabi Paste', 17367.18, 'IDR', '2022-03-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Cake - Cheese Cake 9 Inch', 61013.37, 'CNY', '2022-05-05');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Beef - Salted', 4846.87, 'ZAR', '2022-04-12');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pants Custom Dry Clean', 20214.94, 'PLN', '2022-12-19');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Yeast Dry - Fermipan', 84492.83, 'RUB', '2022-06-25');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Ham - Cooked Bayonne Tinned', 11353.99, 'IDR', '2022-06-24');
insert into experiences (exp_name, exp_price, exp_currency, exp_date) values ('Pate - Peppercorn', 61146.47, 'HUF', '2023-02-03');
*/