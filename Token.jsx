import {useState, useEffect} from "react";
import {ethers} from "ethers";
import {TokenABI} from "./abi/TokenABI";

function Token(){
    const[balance, setBalance] = useState("");
    const[recipient, setRecipient] = useState("");
    const[amount, setAmount] = useState("");
    const[spender, setSpender] = useState("");
    const[allowance, setAllowance] = useState("");
;
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const getBalance = async() =>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        const contract = new ethers.Contract(
            contractAddress,
            TokenABI,
            signer
        );

        const value = await contract.balanceOf(address);

        setBalance(ethers.formatEther(value));
    };

    const transferTokens = async()=>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            contractAddress,
            TokenABI,
            signer
        );

        const tx = await contract.transfer(recipient, ethers.parseEther(amount));

        await tx.wait();

        getBalance();
    };

    const approveTokens = async()=>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            contractAddress,
            TokenABI,
            signer
        );

        const tx = await contract.approve(spender, ethers.parseEther(amount));

        await tx.wait();
    };

    const getAllowance = async()=>{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const owner = await signer.getAddress();

        const contract = new ethers.Contract(
            contractAddress,
            TokenABI,
            signer
        );

        const tx = await contract.approve(owner, spender);
        
        setAllowance(ethers.formatEther(amount));
    };

    useEffect(()=>{
        getBalance();
    },[]);

    return(
        <div>
            <h2>ERC20 Dashboard</h2>

            <h3>Balance : {balance}</h3>

            <input
            placeholder = "Recipient"
            value = {recipient}
            onChange = {(e)=> setRecipient(e.target.value)}
            />

            <input
            placeholder = "Amount"
            value = {amount}
            onChange = {(e)=> setAmount(e.target.value)}
            />

            <button onClick = {transferTokens}>Transfer</button>

            <hr/>

            <input
            placeholder = "Spender"
            value = {spender}
            onChange = {(e)=> setSpender(e.target.value)}
            />

            <button onClick = {approveTokens}>Approve</button>

            <button onClick = {getAllowance}> Set Allowance</button>

            <p>Allowance : {allowance} </p>
        </div>
    );
}

export default Token;