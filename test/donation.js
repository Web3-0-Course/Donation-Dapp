const { expect } = require('chai');

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');


describe('Donation Contract', () => { 
    async function deployDonationFixture(){
        const donation = await ethers.getContractFactory('Donation');
        const donationContract = await donation.deploy();
        const [owner, addr1] = await ethers.getSigners();


        await donationContract.deployed();

        return { donationContract, owner, addr1 };
    }

    describe('Upload Image', () => { 
        it("Should upload image to blockchain", async ()=> {
            const { donationContract, owner, addr1 } = await loadFixture(deployDonationFixture);

            // create an image
            let imageUri = "ipfs://QmViRhW7nUyBG5oSmmmuKistiFQujicUp1mceDgijwg5oN"
            let imageDescription = "Image of Miyamoto Mushashi"
            
            let tnx = await donationContract.uploadImage(imageUri, imageDescription, {from: owner.address});

            console.log("Transaction : ", tnx)
            // call image
            let callImage = await donationContract.images(1);
            console.log(callImage);

            expect(callImage.uri).to.equal(imageUri);
            expect(callImage.description).to.equal(imageDescription);
        });
        
        
    });
    describe('Donate to Image Owner', () => { 
        it("Should donate to image owner", async () => {
            const {donationContract, owner, addr1} = await loadFixture(deployDonationFixture);

            // create a new image
            let imageUri = "ipfs://QmViRhW7nUyBG5oSmmmuKistiFQujicUp1mceDgijwg5oN"
            let imageDescription = "Image of Miyamoto Mushashi"
            
            let tnx = await donationContract.uploadImage(imageUri, imageDescription);
            await tnx.wait();

            //console.log("Transaction : ", tnx)
            
            // make a donation 
            let donationAmount = await ethers.BigNumber.from(10)

            let donateTnx = await donationContract.donateImageOwner(1, {from: addr1.address,value: donationAmount });

            console.log("Donation Transaction : ",donateTnx)


            // call image
            let callImage = await donationContract.images(1);
            console.log(callImage);            

            expect(callImage.donationAmount).to.equal(donationAmount)

        })
     })

});