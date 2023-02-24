// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Donation {
    // keep track of total number of images in contract
    uint256 public imageCount = 0;

    // date structure to store images data
    struct Image {
        uint256 id;
        string uri;
        string description;
        uint256 donationAmount;
        address payable author;
    }

    mapping(uint256 => Image) public images;

    // event emitted when image is created
    event ImageCreated(
        uint256 id, 
        string uri, 
        string description, 
        uint256 donationAmount, 
        address payable author
    );

    // event emitted when an there is a donation
    event DonateImage (
        uint256 id, 
        string uri,
        string description, 
        uint256 donationAmount, 
        address payable author
    );

    // create an Image
    function uploadImage(string memory _imgUri, string memory _description) public {
        require(bytes(_imgUri).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));
        imageCount++;
        images[imageCount] = Image(
            imageCount,
            _imgUri,
            _description,
            0,
            payable(msg.sender)
        );
        emit ImageCreated(imageCount, _imgUri, _description, 0, payable(msg.sender));
    }

    function donateImageOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= imageCount);

        Image memory _image = images[_id];
        address payable _author = _image.author;
        _author.transfer(msg.value);
        _image.donationAmount = _image.donationAmount + msg.value;
        images[_id] = _image;
        
        emit DonateImage(_id, _image.uri, _image.description, _image.donationAmount, _author);
    }
    
}