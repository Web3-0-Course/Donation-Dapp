const main = async () => {
    let donation = await ethers.getContractFactory("Donation");
    let donationContract =  await donation.deploy();

    await donationContract.deployed();

    console.log('Donation contract address : ', donationContract.address);

    return donationContract;

}

const run = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error){
        console.error(error);
        process.exit(1);
    }
}

runMain();