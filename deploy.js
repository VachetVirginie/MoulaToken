const  HDWalletProvider = require('truffle-hdwallet-provider');
const web3 = require('web3');
const path = require('path');
const fs = require('fs');
const { default: Web3 } = require('web3');
const { exit } = require('process');

const provider = new HDWalletProvider(
    'record solution hand vehicle sick basic outside oblige snake agree park grab',
    'https://rinkeby.infura.io/v3/abd2910b76ce4a4cb0847fbd7ca0e8f5'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, 'bin', 'MoulaToken.abi');
const abi = fs.readFileSync(abiPath, 'utf8');

const byteCodePath = path.resolve(__dirname, 'bin', 'MoulaToken.bin');
const bytecode = fs.readFileSync(byteCodePath, 'utf8');

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('From account:', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(abi))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '100000'});
    console.log('Contract deployed to:', result.option.address);
    exit(0); 
}

deploy();