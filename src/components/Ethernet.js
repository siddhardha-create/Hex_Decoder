import React, { useState } from "react";
import IPv4 from "./IPv4";

const Ethernet = ({ input, setInput }) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [decoded, setDecoded] = useState(false);
  const [nextProtocol, setNextProtocol] = useState(null);

  const handleDecode = () => {
    const sanitizedInput = input.replace(/\s+/g, "");
    console.log("Sanitized Input:", sanitizedInput); // Debug log

    if (sanitizedInput.length >= 28) {
      const destination = sanitizedInput
        .slice(0, 12)
        .match(/.{1,2}/g)
        .join(":");
      const source = sanitizedInput
        .slice(12, 24)
        .match(/.{1,2}/g)
        .join(":");
      console.log("Destination Address:", destination); // Debug log
      console.log("Source Address:", source); // Debug log

      setDestinationAddress(destination);
      setSourceAddress(source);
      const protocolCode = sanitizedInput.slice(24, 28).toUpperCase();
      switch (protocolCode) {
        case "0800":
          setNextProtocol("IPv4");
          break;
        case "0806":
          setNextProtocol("ARP");
          break;
        case "8100":
          setNextProtocol("VLAN");
          break;
        case "86DD":
          setNextProtocol("IPv6");
          break;
        default:
          setNextProtocol(null);
      }
      setDecoded(true);
    } else {
      console.error("Input is too short to decode addresses"); // Error log
    }
  };

  const handleEncode = () => {
    const newDestination = destinationAddress.replace(/:/g, "");
    const newSource = sourceAddress.replace(/:/g, "");
    const remainingData = input.replace(/\s+/g, "").slice(24);
    const encodedData = newDestination + newSource + remainingData;
    const formattedData = encodedData.match(/.{1,2}/g).join(" "); // Insert spaces after every two characters
    setInput(formattedData);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mt-7">
        Enter Your Packet Info Here:
      </h1>
      <div className="mb-5 mt-7 ">
        <textarea
          className="w-full p-2 border rounded-lg text-black bg-gray-100"
          rows="5"
          cols="80"
          placeholder="You can copy paste here your packet data (including ethernet header) in hex format. HPD can parse various hex dump formats"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {decoded && (
        <div className="flex flex-col justify-center items-center mb-5 w-full max-w-3xl mx-9">
          <div className="mb-2">
            <label className="block font-bold text-white">
              Destination Address:
            </label>
            <input
              className="w-full p-2 border rounded-lg"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold text-white">
              Source Address:
            </label>
            <input
              className="w-full p-2 border rounded-lg"
              value={sourceAddress}
              onChange={(e) => setSourceAddress(e.target.value)}
            />
          </div>
          {nextProtocol === "IPv4" && (
            <IPv4
              data={input}
              setData={setInput} // Pass a function to update ipv4Data
              handleEncode={handleEncode} // Pass handleEncode to IPv4 component
            />
          )}
        </div>
      )}
      <div className="flex justify-center items-baseline">
        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-red-500 text-white rounded-lg m-3"
        >
          Decode
        </button>
        <button
          onClick={handleEncode}
          className="px-4 py-2 bg-green-500 text-white rounded-lg m-3"
        >
          Encode
        </button>
      </div>
    </div>
  );
};

export default Ethernet;
