# Naive Chain

[![Waffle.io](https://img.shields.io/badge/Status-Development-A44437.svg?style=flat-square)]()

### Description
Basic blockchain nodejs implementation.
this project follows [Lauri Hartikka](https://medium.com/@lhartikk)'s article:
["A blockchain in 200 lines of code"](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)


### API
```txt
GET     /                           init default chain
GET     /chains                     get all chains
POST    /chains                     create a chain
GET     /chain/:name                get a chain by name
GET     /chain/:name/blocks         get all chain's blocks
POST     /chain/:name/blocks        create/update a chain's block
GET     /chain/:name/block/:hash    get a chain's block by hash
```


### Setup
```bash
git clone` [repo] [?name]
cd [repo's name]
npm install
npm start
```

