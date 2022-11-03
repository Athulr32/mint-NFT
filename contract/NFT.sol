// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Project is ERC721, ERC721URIStorage, Ownable {



    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;

    mapping(address=>uint[]) addressTokenMap;

    mapping(uint=>address)minter;

    mapping(uint256 => address) private _owners;

     mapping(uint256 => address) private _tokenApprovals;
    
    constructor() ERC721("Project", "FYR") {}


    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        existingURIs[uri] = 1;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    //get the tokenURI using tokenID
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    //Get all the tokens of an address
    function getToken(address addr) public view returns (uint[] memory){

        return addressTokenMap[addr];


    }

    //Get owner of the NFT
    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }


    //To mint
    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(existingURIs[metadataURI] != 1, 'NFT already minted!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        addressTokenMap[recipient].push(newItemId);
        minter[newItemId]=recipient;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }


    //Total number of NFT ever minted
    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    



        function getMinter(uint id) public view returns (address){

            return minter[id];
        }

    

        function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {

         uint index = 0;
        while (addressTokenMap[from][index] != tokenId) {
            index++;
        }

  

        if (index >= addressTokenMap[from].length) return;

        for (uint i = index; i<addressTokenMap[from].length-1; i++){
            addressTokenMap[from][i] = addressTokenMap[from][i+1];
        }
        delete addressTokenMap[from][addressTokenMap[from].length-1];
        

        addressTokenMap[to].push(tokenId);
        safeTransferFrom(from, to, tokenId, "");
    }







}

