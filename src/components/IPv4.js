import React, { useState, useEffect } from "react";

const IPv4 = ({ data, setData }) => {
  const [version, setVersion] = useState("");
  const [headerLength, setHeaderLength] = useState("");
  const [differentiatedServices, setDifferentiatedServices] = useState("");
  const [totalLength, setTotalLength] = useState("");
  const [identification, setIdentification] = useState("");
  const [fragmentOffset, setFragmentOffset] = useState("");
  const [ttl, setTtl] = useState("");
  const [protocol, setProtocol] = useState("");
  const [headerChecksum, setHeaderChecksum] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    if (data.length >= 40) {
      setVersion(data.slice(0, 1));
      setHeaderLength((parseInt(data.slice(1, 2), 16) * 4).toString());
      setDifferentiatedServices(data.slice(2, 4));
      setTotalLength(data.slice(4, 8));
      setIdentification(data.slice(8, 12));
      setFragmentOffset(data.slice(12, 16));
      setTtl(parseInt(data.slice(16, 18), 16).toString());
      setProtocol(parseInt(data.slice(18, 20), 16).toString());
      setHeaderChecksum(data.slice(20, 24));
      setSourceAddress(
        data
          .slice(24, 32)
          .match(/.{1,2}/g)
          .join(":")
      );
      setDestinationAddress(
        data
          .slice(32, 40)
          .match(/.{1,2}/g)
          .join(":")
      );
    }
  }, [data]);

  const handleEncode = () => {
    const newVersion = parseInt(version).toString(16).padStart(1, "0");
    const newHeaderLength = (headerLength / 4).toString(16).padStart(1, "0");
    const newDifferentiatedServices = differentiatedServices.padStart(2, "0");
    const newTotalLength = totalLength.padStart(4, "0");
    const newIdentification = identification.padStart(4, "0");
    const newFragmentOffset = fragmentOffset.padStart(4, "0");
    const newTtl = parseInt(ttl).toString(16).padStart(2, "0");
    const newProtocol = parseInt(protocol).toString(16).padStart(2, "0");
    const newHeaderChecksum = headerChecksum.padStart(4, "0");
    const newSource = sourceAddress.replace(/:/g, "");
    const newDestination = destinationAddress.replace(/:/g, "");
    const remainingData = data.replace(/\s+/g, "").slice(68);

    const encodedData = (
      newVersion +
      newHeaderLength +
      newDifferentiatedServices +
      newTotalLength +
      newIdentification +
      newFragmentOffset +
      newTtl +
      newProtocol +
      newHeaderChecksum +
      newSource +
      newDestination +
      remainingData
    ).toUpperCase();

    setData(encodedData);
  };

  return (
    <div className="mt-7">
      <h2 className="text-xl font-bold text-white">IPv4 Header</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-bold text-white">Version:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Header Length:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={headerLength}
            onChange={(e) => setHeaderLength(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">
            Differentiated Services:
          </label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={differentiatedServices}
            onChange={(e) => setDifferentiatedServices(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Total Length:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={totalLength}
            onChange={(e) => setTotalLength(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Identification:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Fragment Offset:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={fragmentOffset}
            onChange={(e) => setFragmentOffset(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">TTL:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Protocol:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Header Checksum:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg"
            value={headerChecksum}
            onChange={(e) => setHeaderChecksum(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">Source Address:</label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg "
            value={sourceAddress}
            onChange={(e) => setSourceAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-white">
            Destination Address:
          </label>
          <input
            className="w-full bg-black text-white p-2 border rounded-lg "
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleEncode}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg m-3 transition duration-300 ease-in-out transform hover:bg-green-600 hover:shadow-lg hover:scale-105 hover:text-gray-200"
      >
        Save Ipv4 Data
      </button>
    </div>
  );
};

export default IPv4;

