-- Obriši postojeću bazu ako postoji
DROP DATABASE IF EXISTS xss_app;

-- Kreiraj novu bazu
CREATE DATABASE xss_app;
USE xss_app;

-- Korisnici (email login)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  full_name VARCHAR(100),
  description TEXT,
  avatar_url TEXT
);

-- Slike
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  url TEXT,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Komentari na slike
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_id INT,
  user_id INT,
  content TEXT,
  FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Praćenje korisnika
CREATE TABLE followers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id INT,
  followed_id INT,
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Test korisnici
INSERT INTO users (email, password, full_name, description, avatar_url) VALUES
('mika@example.com', 'mika123', 'Mika Petrovic', 'Volim pse!', 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='),
('paja@example.com', 'paja123', 'Paja Macic', 'Mačke su moj svet.', 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='),
('sonja@example.com', 'xssqueen', 'Sonja G.', 'Ljubitelj XSS-a', 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=');

-- Test slike
INSERT INTO images (user_id, url, description) VALUES
(1, 'https://posteraj.rs/cdn/shop/products/ZVPBEP0026-Bernski_planinski_pas_pozira.jpg?v=1619010078', 'Moj pas se smeje'),
(2, 'https://media.istockphoto.com/id/942861934/photo/cardboard-box-with-a-cat.jpg?s=612x612&w=0&k=20&c=FLYVtjJm139ETiaRBfYFZAVjFqp1WaCP5Vr9WJcSwTc=', 'Macka u kutiji'),
(3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg', 'Meda, nije ljubimac ali je simpatican');

-- Test komentari
INSERT INTO comments (image_id, user_id, content) VALUES
(1, 2, 'Prelep pas!'),
(2, 1, 'Macka carica'),
(1, 2, 'Prelep pas!'),
(2, 1, 'Macka carica'),
(1, 2, 'Prelep pas!'),
(2, 1, 'Macka carica'),
(1, 3, 'Slatko');

-- Test praćenja
INSERT INTO followers (follower_id, followed_id) VALUES
(1, 2), -- Mika prati Paju
(1, 3), -- Mika prati Sonju
(2, 1); -- Paja prati Miku