'use strict'

const { client, transactionBuilder } = require('@arkecosystem/crypto')
const utils = require('./utils')
const testUtils = require('../../../../lib/utils/test-utils')

/**
 * Attempt to double spend
 * @param  {Object} options = { }
 * @return {void}
 */
module.exports = async (options) => {
    const config = require('../../../networks/e2enet/e2enet.json')
    client.setConfig(config)

    const transactions = [
      transactionBuilder
        .delegateRegistration()
        .usernameAsset("dummy-delegate1")
        .sign(utils.doubleDelRegSender.passphrase)
        .getStruct(),
      transactionBuilder
        .delegateRegistration()
        .usernameAsset("dummy-delegate2")
        .sign(utils.doubleDelRegSender.passphrase)
        .getStruct()
    ]

    await testUtils.POST('transactions', { transactions })
}