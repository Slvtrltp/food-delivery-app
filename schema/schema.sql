CREATE table users (
  id VARCHAR(255) PRIMARY key,
  name VARCHAR(255) 
  )
create table todos (
  id VARCHAR(255) PRIMARY key,
  title VARCHAR(255) not NULL,
  checked BOOLEAN DEFAULT FALSE,
  userId VARCHAR(255),
  FOREIGN key (userId) REFERENCES users(id)
)