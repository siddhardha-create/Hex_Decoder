import React from "react";
import { useState, useEffect } from "react";

const IPv4 = ({ data }) => {
  const [version, setVersion] = useState("");
  const [headerLength, setHeaderLength] = useState("");
  const [differentiatedServices, setDifferentiatedServices] = useState("");
  const [totalLength, setTotalLength] = useState("");
  const [identification, setIdentification] = useState("");
  const [fragmentOffset, setFragmentOffset] = useState("");
  const [ttl, setTtl] = useState("");
  const [protocol, setProtocol] = useState("");
  const [headerChecksum, setHeaderChecksum] = useState("");
  const [sourceAddress, setSourceAddres] = useState("");
  const [destinationAddress, setDestinationAddres] = useState("");

  useEffect(() => {
    if (data.length >= 72) {
      const sanitizedInput = data.replace(/\s+/g, "");
      setVersion(sanitizedInput.slice(28, 29));
      setHeaderLength(parseInt(sanitizedInput.slice(29, 30), 16) * 4);
      setDifferentiatedServices(sanitizedInput.slice(30, 32));
      setTotalLength(sanitizedInput.slice(32, 36));
      setIdentification(sanitizedInput.slice(36, 40));
      setFragmentOffset(sanitizedInput.slice(40, 44));
      setTtl(sanitizedInput.slice(44, 46));
      setProtocol(sanitizedInput.slice(46, 48));
      setHeaderChecksum(sanitizedInput.slice(48, 52));
      setSourceAddres(
        sanitizedInput
          .slice(52, 60)
          .match(/.{1,2}/g)
          .join(":")
      );
      setDestinationAddres(
        sanitizedInput
          .slice(60, 68)
          .match(/.{1,2}/g)
          .join(":")
      );
    }
  }, [data]);

  const Ipv4encode = () => {
    const newversion = version;
    const newheaderlength = headerLength / 4;
    const newdifferentiatedservices = differentiatedServices;
    const newtotallength = totalLength;
    const newidentifcation = identification;
    const newfragmentOffset = fragmentOffset;
    const newttl = ttl;
    const newprotocol = protocol;
    const newheaderchecksum = headerChecksum;
    const newDestination = destinationAddress.replace(/:/g, "");
    const newSource = sourceAddress.replace(/:/g, "");
    const remainingData = data.replace(/\s+/g, "").slice(68);
    const encodedData1 =
      newversion +
      newheaderlength +
      newdifferentiatedservices +
      newtotallength +
      newidentifcation +
      newfragmentOffset +
      newttl +
      newprotocol +
      newheaderchecksum +
      newDestination +
      newSource +
      remainingData;
  };

  return (
    <div className="flex flex-col justify-center items-center mb-5 w-full max-w-3xl mx-9">
      <h1 className="text-3xl font-bold text-center mt-7 text-white">
        IPv4 Packet Information
      </h1>
      <div className="w-full max-w-3xl mt-5">
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="font-bold text-white">Version:</td>
              <td>
                <input
                  name="version"
                  className="w-full p-2 border rounded-lg"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Header Length:</td>
              <td>
                <input
                  name="headerLength"
                  className="w-full p-2 border rounded-lg"
                  value={headerLength}
                  onChange={(e) => setHeaderLength(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Differentiated Services:</td>
              <td>
                <input
                  name="differentiatedServices"
                  className="w-full p-2 border rounded-lg"
                  value={differentiatedServices}
                  onChange={(e) => setDifferentiatedServices(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Total Length:</td>
              <td>
                <input
                  name="totalLength"
                  className="w-full p-2 border rounded-lg"
                  value={totalLength}
                  onChange={(e) => setTotalLength(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Identification:</td>
              <td>
                <input
                  name="identification"
                  className="w-full p-2 border rounded-lg"
                  value={identification}
                  onChange={(e) => setIdentification(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Fragment Offset:</td>
              <td>
                <input
                  name="fragmentOffset"
                  className="w-full p-2 border rounded-lg"
                  value={fragmentOffset}
                  onChange={(e) => setFragmentOffset(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Time to Live:</td>
              <td>
                <input
                  name="ttl"
                  className="w-full p-2 border rounded-lg"
                  value={ttl}
                  onChange={(e) => setTtl(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Protocol:</td>
              <td>
                <input
                  name="protocol"
                  className="w-full p-2 border rounded-lg"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Header Checksum:</td>
              <td>
                <input
                  name="headerChecksum"
                  className="w-full p-2 border rounded-lg"
                  value={headerChecksum}
                  onChange={(e) => setHeaderChecksum(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Source Address:</td>
              <td>
                <input
                  name="sourceAddress"
                  className="w-full p-2 border rounded-lg"
                  value={sourceAddress}
                  onChange={(e) => setSourceAddres(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-white">Destination Address:</td>
              <td>
                <input
                  name="destinationAddress"
                  className="w-full p-2 border rounded-lg"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddres(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IPv4;
