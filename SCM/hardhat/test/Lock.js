const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { ethers } = require('hardhat');

describe('TrackMedicine', function () {
  async function deployContract() {
    const [manufacture, other] = await ethers.getSigners();
    const track = await ethers.getContractFactory('TrackMedicine');
    const Track = await track.deploy();
    return { manufacture, other, Track };
  }

  it("should be deployed by the manufacturer", async function () {
    const { Track, manufacture } = await loadFixture(deployContract);
    expect(await Track.deploymentTransaction().from).to.equal(manufacture.address);
  });

  it('should be able to ship medicine', async function () {
    const { Track, manufacture, other } = await loadFixture(deployContract);

    // Manufacture a medicine first
    await Track.manufactureMedicine(1, "Paracetamol", 100, "7/12/2024", 5);

    // Pack the medicine
    await Track.packMedicine(1, "7/13/2024");

    // Ship the medicine to the distributor (we're using the `other` account as the distributor here)
    await Track.shipMedicine(1, "7/14/2024", other.address);

    // Retrieve the medicine details to check the status and shipping date
    const tracking = await Track.medicines(1);

    // Check that the shipping date is set correctly
    expect(tracking.dates.s_Date).to.equal("7/14/2024");
    expect(tracking.status).to.equal(2); // Status.Shipped = 2

    // Verify that the distributor address is set
    expect(tracking.distributor).to.equal(other.address);
  });

  it('should emit StatusUpdated event when shipping medicine', async function () {
    const { Track, manufacture, other } = await loadFixture(deployContract);

    // Manufacture a medicine first
    await Track.manufactureMedicine(1, "Paracetamol", 100, "7/12/2024", 5);

    // Pack the medicine
    await Track.packMedicine(1, "7/13/2024");

    // Ship the medicine to the distributor (we're using the `other` account as the distributor here)
    await expect(Track.shipMedicine(1, "7/14/2024", other.address))
      .to.emit(Track, 'StatusUpdated')
      .withArgs(1, 2); // Check for the correct batch ID (1) and status (2: Shipped)
  });
});
