const { expect } = require('chai');

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('Donation Contract', () => { 
    async function deployDonationFixture(){
        const donation = await ethers.getContractFactory('Donation');
        const donationContract = await donation.deploy();

        await donation.deployed();

        return donationContract
    }
});