// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract TrackMedicine {
    enum Status { Manufactured, Packed, Shipped, Picked, Stored, Delivered }

    struct Medicine {
        string name;
        uint256 quantity;
        address manufacturer;
        address distributor;
        address retailer;
        Status status;
        int8 temp;
        Dates dates;
        Location location;
    }

    struct Dates {
        string m_Date;
        string p_Date;
        string s_Date;
        string picDate;
        string d_Date;
        string storeDate;
    }

    struct Location {
        string storageLocation;
    }

    mapping(uint256 => Medicine) public medicines; // Batch ID to Medicine

    address public manufacturer;

    event StatusUpdated(uint256 batchId, Status status);

    modifier onlyManufacturer() {
        require(msg.sender == manufacturer, "Not the manufacturer");
        _;
    }

    modifier onlyDistributor(uint256 batchId) {
        require(msg.sender == medicines[batchId].distributor, "Not the distributor");
        _;
    }

    modifier validStatus(uint256 batchId, Status requiredStatus) {
        require(medicines[batchId].status == requiredStatus, "Invalid state transition");
        _;
    }

    constructor() {
        manufacturer = msg.sender; // The deployer is set as the manufacturer
    }

    function manufactureMedicine(
        uint256 _batchId,
        string memory _name,
        uint256 _quantity,
        string memory _mDate,
        int8 _temp
    ) public onlyManufacturer {
        medicines[_batchId] = Medicine({
            name: _name,
            quantity: _quantity,
            manufacturer: manufacturer,
            distributor: address(0),
            retailer: address(0),
            status: Status.Manufactured,
            temp: _temp,
            dates: Dates({ m_Date: _mDate, p_Date: "", s_Date: "", picDate: "", d_Date: "", storeDate: "" }),
            location: Location({ storageLocation: "" })
        });


        emit StatusUpdated(_batchId, Status.Manufactured);
    }

    function packMedicine(uint256 _batchId, string memory _pDate)
        public
        onlyManufacturer
        validStatus(_batchId, Status.Manufactured)
    {
        require(bytes(medicines[_batchId].dates.m_Date).length > 0, "Batch ID does not exist");

        medicines[_batchId].dates.p_Date = _pDate;
        medicines[_batchId].status = Status.Packed;

        emit StatusUpdated(_batchId, Status.Packed);
    }

    function shipMedicine(
        uint256 _batchId,
        string memory _sDate,
        address _distributor
    ) public onlyManufacturer validStatus(_batchId, Status.Packed) {
        require(bytes(medicines[_batchId].dates.m_Date).length > 0, "Batch ID does not exist");
        require(_distributor != address(0), "Distributor address cannot be zero");

        medicines[_batchId].distributor = _distributor;
        medicines[_batchId].dates.s_Date = _sDate;
        medicines[_batchId].status = Status.Shipped;

        emit StatusUpdated(_batchId, Status.Shipped);
    }

    function pickMedicine(uint256 _batchId, string memory _picDate)
        public
        onlyDistributor(_batchId)
        validStatus(_batchId, Status.Shipped)
    {
        require(bytes(medicines[_batchId].dates.m_Date).length > 0, "Batch ID does not exist");

        medicines[_batchId].dates.picDate = _picDate;
        medicines[_batchId].status = Status.Picked;

        emit StatusUpdated(_batchId, Status.Picked);
    }

    function storeMedicine(
        uint256 _batchId,
        string memory _storageLocation,
        string memory _storeDate
    ) public onlyDistributor(_batchId) validStatus(_batchId, Status.Picked) {
        require(bytes(medicines[_batchId].dates.m_Date).length > 0, "Batch ID does not exist");

        medicines[_batchId].location.storageLocation = _storageLocation;
        medicines[_batchId].dates.storeDate = _storeDate;
        medicines[_batchId].status = Status.Stored;

        emit StatusUpdated(_batchId, Status.Stored);
    }

    function deliverMedicine(
        uint256 _batchId,
        string memory _dDate,
        address _retailer
    ) public onlyDistributor(_batchId) validStatus(_batchId, Status.Stored) {
        require(bytes(medicines[_batchId].dates.m_Date).length > 0, "Batch ID does not exist");
        require(_retailer != address(0), "Retailer address cannot be zero");

        medicines[_batchId].retailer = _retailer;
        medicines[_batchId].dates.d_Date = _dDate;
        medicines[_batchId].status = Status.Delivered;

        emit StatusUpdated(_batchId, Status.Delivered);
    }

}
