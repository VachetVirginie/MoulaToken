const path = require('path');
const fs = require('fs');
const solc = require('solc');

const moulaTokenPath = path.resolve(__dirname, 'contract', 'MoulaToken.sol');
const source = fs.readFileSync(moulaTokenPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'MoulaToken.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }

};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['MoulaToken.sol']['MoulaToken'];

var dirName = 'bin';
const contractByteCodePath = path.join(dirName, 'MoulaToken.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'MoulaToken.abi')
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));

