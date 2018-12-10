'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const networkUtils = require('../../../networks/e2enet/utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Creates a transaction to a new wallet
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .transfer()
        .amount(1000 * Math.pow(10, 8))
        .recipientId(utils.transferSender.address)
        .vendorField('send coins for spend with insufficient balance - transfer')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(1000 * Math.pow(10, 8))
        .recipientId(utils.transfer2ndsigSender.address)
        .vendorField('send coins for spend with insufficient balance - transfer with 2nd sig')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(0.5 * Math.pow(10, 8))
        .recipientId(utils.voteSender.address)
        .vendorField('send coins for spend with insufficient balance - vote')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(15 * Math.pow(10, 8))
        .recipientId(utils.delRegSender.address)
        .vendorField('send coins for spend with insufficient balance - delegate registration')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
      transactionBuilder
        .transfer()
        .amount(3 * Math.pow(10, 8))
        .recipientId(utils.secondsigRegSender.address)
        .vendorField('send coins for spend with insufficient balance - 2nd signature registration')
        .fee(0.1 * Math.pow(10, 8))
        .sign(networkUtils.genesisWallet.passphrase)
        .getStruct(),
    ]

    await testUtils.POST('transactions', { transactions })
}