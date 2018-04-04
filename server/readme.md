# Naive Chain | Server

[![Waffle.io](https://img.shields.io/badge/Status-Development-A44437.svg?style=flat-square)]()


### Description
Basic blockchain nodejs implementation.
this project follows [Lauri Hartikka](https://medium.com/@lhartikk)'s article:
["A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)


### Principle
A device contains a database which contains all the chain, a public and a private key.
A block contains a content which is hashed by its creator and the hash of the previous block it depends on.

Once the block created it will be sent over the network for validation from other devices.
If confirmed, this block is then stored in the database.
A block is immutable, it can be read but can't be modified or deleted.

The device is able to read blocks only created by itself.


#### Encryption
The encryption used is AES192 due to it's speed, lightweight and safety.


#### Models
##### Block
- index     : number
- timestamp : any
- data      : number
- nonce     : string
- prevHash  : string
- currHash  : string
- qrCode    : string

##### Database
Collections:
- blocks


### API
```txt
GET     /api                    API infos
GET     /api/block/all          get all blocks
POST    /api/block/one          get one block
GET     /api/block/create       create one block
GET     /chain/check            check chain integrity
```

### Setup
```bash
# go to server folder
cd server

# build server
npm run build

# start mongodb services
brew services start mongodb #osX

npm [start | run dev]
```

