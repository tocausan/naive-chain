# Naive Chain

[![Waffle.io](https://img.shields.io/badge/Status-Development-A44437.svg?style=flat-square)]()

### Description
Basic blockchain nodejs implementation.
this project follows [Lauri Hartikka](https://medium.com/@lhartikk)'s article:
["A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)

### Principle
Write once and read only database made out of blocks.
Once create, blocks can't be modified nor deleted, they are immutable.
One block contains metadatas and content


### API
```txt
GET     /                   landing
GET     /init               device initialisation
GET     /blocks             get all blocks
POST    /blocks             insert a block
GET     /block/:hash        get a block by hash
POST    /validate           check block validation
GET     /chain/check        check chain corruption
GET     /chain/devices      get connected devices
```


### Setup
```bash
git clone [repo] [?name]
cd [repo's name]
npm install

# start mongodb services

npm start
```

