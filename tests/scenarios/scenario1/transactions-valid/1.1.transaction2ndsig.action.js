'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')
const networkUtils = require('../../../networks/e2enet/utils')

/**
 * Send the transactions 2nd signed (1 of each type)
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = []
    Object.keys(utils.wallets).forEach(txType => {
      // ignore 2nd sign registration tx type as we already have a 2nd signature
      if (txType !== 'secondSignRegistration') {
        const wallets = utils.wallets[txType]
        
        transactions.push(_genTransaction(txType, wallets))
      }
    })

    await testUtils.POST('transactions', { transactions })

    function _genTransaction(type, wallets) {
      let transaction
      switch (type) {
        case 'transfer':
          transaction = transactionBuilder
            .transfer()
            .amount(2 * Math.pow(10, 8))
            .recipientId(wallets[1].address)
          break;
        case 'vote':
          transaction = transactionBuilder
            .vote()
            .votesAsset([`+${networkUtils.delegates[2].publicKey}`])
          break;
        case 'delegateRegistration':
          transaction = transactionBuilder
            .delegateRegistration()
            .usernameAsset(wallets[2].address.slice(0,10).toLowerCase())
          break;
      }
      
      return transaction
        .fee(utils.fees[type])
        .sign(wallets[2].passphrase)
        .secondSign(wallets[3].passphrase)
        .getStruct()
    }
}