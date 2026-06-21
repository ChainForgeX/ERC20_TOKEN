const { ethers } = require("hardhat");

async function main() {

    const Token =
        await ethers.getContractFactory(
            "MyToken"
        );

    const token =
        await Token.deploy();

    await token.waitForDeployment();

    const tokenAddress =
        await token.getAddress();

    console.log(
        "Token deployed to:",
        tokenAddress
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
