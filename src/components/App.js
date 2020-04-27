import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Notify from 'bnc-notify';

const options = {
  dappId: '5faf9ea3-b2d4-4123-84f8-1dc3014acf92',       
  networkId: 4
}

var notify = Notify(options);

async function sendTransaction() {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const { emitter } = notify.account(accounts[0]);
  // web3.eth.sendTransaction({
  //   from: accounts[0],
  //   to: '0xcD3930210439Ad7Fc057455E72C6b9e7eDeb0Bca',
  //   value: '100000'
  // })
  // .on('transactionHash', (hash) => {
  //   console.log(hash);
  //   notify.hash(hash);
  // })
  emitter.on("all", transaction => {
    console.log(transaction);
  })

}


// async function sendTransaction() {
//   const web3 = window.web3;
//   const accounts = await web3.eth.getAccounts();
//   const txDetails = {
//     from: accounts[0],
//     to: '0xcD3930210439Ad7Fc057455E72C6b9e7eDeb0Bca',
//     value: '100000'
//   }
//   const getBalance = account => web3.eth.getBalance(account);
//   const balance = await getBalance(accounts[0]);
//   const gasPrice = web3.eth.getGasPrice;
//   const estimateGas = txDetails => () => web3.eth.estimateGas(txDetails).then(res => res.toString());
//   const sendTransaction = txDetails => () => 
//     new Promise((resolve, reject) => 
//         web3.eth.sendTransaction(txDetails)
//         .on('transactionHash', resolve)
//         .catch(reject)
//       );

//   notify.transaction({
//     txDetails,
//     balance,
//     gasPrice,
//     estimateGas: estimateGas(txDetails),
//     sendTransaction: sendTransaction(txDetails)
//   });

// }

class App extends Component {

  async componentWillMount() {
      await this.loadWeb3();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } 
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } 
    else {
      window.alert('Non-Ethereum browser detected, please install MetaMask');
    }
  }

  render() {
    return (
      <div>
        <button onClick={sendTransaction}>Send Transaction</button>
      </div>
    );
  }
}

export default App;
