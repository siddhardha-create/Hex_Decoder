// import React, { useState } from "react";
// import bgImage from "./assets/bg1-modified.jpg";

// function App() {
//   const [input, setInput] = useState("");
//   const [destinationAddress, setDestinationAddress] = useState("");
//   const [sourceAddress, setSourceAddress] = useState("");
//   const [decoded, setDecoded] = useState(false);

//   const handleDecode = () => {
//     const sanitizedInput = input.replace(/\s+/g, "");
//     console.log("Sanitized Input:", sanitizedInput); // Debug log

//     if (sanitizedInput.length >= 24) {
//       const destination = sanitizedInput
//         .slice(0, 12)
//         .match(/.{1,2}/g)
//         .join(":");
//       const source = sanitizedInput
//         .slice(12, 24)
//         .match(/.{1,2}/g)
//         .join(":");
//       console.log("Destination Address:", destination); // Debug log
//       console.log("Source Address:", source); // Debug log

//       setDestinationAddress(destination);
//       setSourceAddress(source);
//       setDecoded(true);
//     } else {
//       console.error("Input is too short to decode addresses"); // Error log
//     }
//   };

//   const handleEncode = () => {
//     const newDestination = destinationAddress.replace(/:/g, "");
//     const newSource = sourceAddress.replace(/:/g, "");
//     const remainingData = input.replace(/\s+/g, "").slice(24);
//     const encodedData = newDestination + newSource + remainingData;
//     const formattedData = encodedData.match(/.{1,2}/g).join(" "); // Insert spaces after every two characters
//     setInput(formattedData);
//   };

//   return (
//     <div
//       className="bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         height: "100vh", // Make the container full screen height
//       }}
//     >
//       <div className="flex justify-center items-center">
//         <h1 className="text-5xl font-bold text-center mt-7">
//           Hex Packet Decoder
//         </h1>
//       </div>

//       <div className="flex justify-center items-center mb-8 mt-6">
//         <div className="relative">
//           <select className="block appearance-none w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
//             <option value="">Select Protocol</option>
//             <option value="ethernet">Ethernet</option>
//             <option value="infiniband">InfiniBand</option>
//             <option value="vlan">VLAN</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
//             <svg
//               className="fill-current h-4 w-4"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col justify-center items-center">
//         <h1 className="text-3xl font-bold text-center mt-7">
//           Enter Your Packet Info Here:
//         </h1>
//         <div className="mb-5 mt-7 ">
//           <textarea
//             className="w-full p-2 border rounded-lg text-black bg-gray-100"
//             rows="5"
//             cols="80"
//             placeholder="You can copy paste here your packet data (including ethernet header) in hex format. HPD can parse various hex dump formats"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         {decoded && (
//           <div className=" flex flex-col justify-center items-center mb-5 w-full max-w-3xl mx-9 ">
//             <div className="mb-2">
//               <label className="block font-bold text-white">
//                 Destination Address:
//               </label>
//               <input
//                 className="w-full p-2 border rounded-lg"
//                 value={destinationAddress}
//                 onChange={(e) => setDestinationAddress(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block font-bold text-white">
//                 Source Address:
//               </label>
//               <input
//                 className="w-full p-2 border rounded-lg"
//                 value={sourceAddress}
//                 onChange={(e) => setSourceAddress(e.target.value)}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center items-baseline">
//         <button
//           onClick={handleDecode}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg m-3"
//         >
//           Decode
//         </button>
//         <button
//           onClick={handleEncode}
//           className="px-4 py-2 bg-green-500 text-white rounded-lg m-3"
//         >
//           Encode
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import bgImage from "./assets/bg1-modified.jpg";
import Ethernet from "./components/Ethernet";

function App() {
  const [input, setInput] = useState("");
  const [protocol, setProtocol] = useState("");

  const handleProtocolChange = (e) => {
    setProtocol(e.target.value);
  };

  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "100vh", // Ensure the container is at least full screen height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold text-center mt-7">
          Hex Packet Decoder
        </h1>
      </div>

      <div className="flex justify-center items-center mb-8 mt-6">
        <div className="relative">
          <select
            className="block appearance-none w-64 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            value={protocol}
            onChange={handleProtocolChange}
          >
            <option value="">Select Protocol</option>
            <option value="ethernet">Ethernet</option>
            <option value="infiniband">InfiniBand</option>
            <option value="vlan">VLAN</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {protocol === "ethernet" && (
        <Ethernet input={input} setInput={setInput} />
      )}
      {/* Add other protocol components here when they are created */}
    </div>
  );
}

export default App;
