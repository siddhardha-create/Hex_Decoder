import React, { useState } from "react";
import IPv4 from "./IPv4";
import ARP from "./ARP";

const Ethernet = ({ input, setInput }) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [decoded, setDecoded] = useState(false);
  const [nextProtocol, setNextProtocol] = useState(null);
  const [ipv4Data, setIpv4Data] = useState("");
  const [ARPData, setARPData] = useState("");

  const handleDecode = () => {
    const sanitizedInput = input.replace(/\s+/g, "");

    if (sanitizedInput.length >= 28) {
      const destination = sanitizedInput
        .slice(0, 12)
        .match(/.{1,2}/g)
        .join(":");
      const source = sanitizedInput
        .slice(12, 24)
        .match(/.{1,2}/g)
        .join(":");

      setDestinationAddress(destination);
      setSourceAddress(source);
      const protocolCode = sanitizedInput.slice(24, 28).toUpperCase();
      switch (protocolCode) {
        case "0800":
          setNextProtocol("IPv4");
          setIpv4Data(sanitizedInput.slice(28)); // Set IPv4 data
          break;
        case "0806":
          setNextProtocol("ARP");
          setARPData(sanitizedInput.slice(28));
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
      console.error("Input is too short to decode addresses");
    }
  };

  const handleEncode = () => {
    const newDestination = destinationAddress.replace(/:/g, "");
    const newSource = sourceAddress.replace(/:/g, "");
    let encodedData = newDestination + newSource;

    if (nextProtocol === "IPv4") {
      // Encode IPv4 data
      const ipv4Encoded = ipv4Data.replace(/\s+/g, "");
      encodedData = encodedData + "0800" + ipv4Encoded;
    }
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
          placeholder="Paste your packet data here..."
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
              data={ipv4Data} // Pass IPv4 data
              setData={setIpv4Data} // Pass function to update IPv4 data
            />
          )}
          {nextProtocol === "ARP" && (
            <ARP data={ARPData} setData={setARPData} />
          )}
        </div>
      )}
      <div className="flex justify-center items-baseline">
        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-red-500 text-white rounded-lg m-3 transition duration-300 ease-in-out transform hover:bg-green-600 hover:shadow-lg hover:scale-105 hover:text-gray-200"
        >
          Decode
        </button>
        <button
          onClick={handleEncode}
          className="px-4 py-2 bg-green-500 text-white rounded-lg m-3 transition duration-300 ease-in-out transform hover:bg-green-600 hover:shadow-lg hover:scale-105 hover:text-gray-200"
        >
          Encode
        </button>
      </div>
    </div>
  );
};

export default Ethernet;
