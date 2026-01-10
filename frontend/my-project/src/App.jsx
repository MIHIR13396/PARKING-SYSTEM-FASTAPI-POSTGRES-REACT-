// import { useEffect, useState } from "react";

// const API = "http://127.0.0.1:8000";

// function App() {
//   const [parking, setParking] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     vehicle_type: "",
//     vehicle_num: "",
//     parking_loc: ""
//   });

//   const fetchParking = async () => {
//     const res = await fetch(`${API}/parking/`);
//     const data = await res.json();
//     setParking(data);
//   };

//   useEffect(() => {
//     fetchParking();
//   }, []);

//   const createParking = async () => {
//     await fetch(`${API}/parking/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         vehicle_type: Number(form.vehicle_type)
//       })
//     });
//     fetchParking();
//   };

//   const updateParking = async (vehicle_num) => {
//     const newLoc = prompt("Enter new parking location:");
//     if (!newLoc) return;

//     await fetch(`${API}/parking/${vehicle_num}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ parking_loc: newLoc })
//     });
//     fetchParking();
//   };

//   const deleteParking = async (vehicle_num) => {
//     await fetch(`${API}/parking/${vehicle_num}`, {
//       method: "DELETE"
//     });
//     fetchParking();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 className="text-blue-600">Parking Management</h1>

//       <h3>Add New Parking</h3>
//       <input placeholder="Name"
//         onChange={(e) => setForm({ ...form, name: e.target.value })} />

//       <input placeholder="Vehicle Type (2/3/4)"
//         onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} />

//       <input placeholder="Vehicle Number"
//         onChange={(e) => setForm({ ...form, vehicle_num: e.target.value })} />

//       <input placeholder="Parking Location"
//         onChange={(e) => setForm({ ...form, parking_loc: e.target.value })} />

//       <button onClick={createParking}>Create</button>

//       <hr />

//       <h3>Parked Vehicles</h3>
//       {parking.map((p) => (
//         <div key={p.id} style={{ marginBottom: "10px" }}>
//           <strong>{p.vehicle_num}</strong> — {p.name} — Spot {p.parking_loc}
//           <br />
//           <button onClick={() => updateParking(p.vehicle_num)}>Update</button>
//           <button onClick={() => deleteParking(p.vehicle_num)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function App() {
  const [parking, setParking] = useState([]);
  const [form, setForm] = useState({
    name: "",
    vehicle_type: "",
    vehicle_num: "",
    parking_loc: ""
  });

  const fetchParking = async () => {
    const res = await fetch(`${API}/parking/`);
    const data = await res.json();
    setParking(data);
  };

  useEffect(() => {
    fetchParking();
  }, []);

  const createParking = async () => {
    await fetch(`${API}/parking/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        vehicle_type: Number(form.vehicle_type)
      })
    });
    fetchParking();
  };

  const updateParking = async (vehicle_num) => {
    const newLoc = prompt("Enter new parking location:");
    if (!newLoc) return;

    await fetch(`${API}/parking/${vehicle_num}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parking_loc: newLoc })
    });
    fetchParking();
  };

  const deleteParking = async (vehicle_num) => {
    await fetch(`${API}/parking/${vehicle_num}`, {
      method: "DELETE"
    });
    fetchParking();
  };

  return (
    <div className="min-h-screen text-black-500 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Parking Management
        </h1>

        {/* Form */}
        <h3 className="text-xl font-semibold mb-4">Add New Parking</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Vehicle Type (2/3/4)"
            onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })}
          />

          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Vehicle Number"
            onChange={(e) => setForm({ ...form, vehicle_num: e.target.value })}
          />

          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Parking Location"
            onChange={(e) => setForm({ ...form, parking_loc: e.target.value })}
          />
        </div>

        <button
          onClick={createParking}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Parking
        </button>

        <hr className="my-6" />

        {/* List */}
        <h3 className="text-xl font-semibold mb-4">Parked Vehicles</h3>

        {parking.length === 0 && (
          <p className="text-gray-500 text-center">No vehicles parked.</p>
        )}

        <div className="space-y-4">
          {parking.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{p.vehicle_num}</p>
                <p className="text-sm text-gray-600">
                  {p.name} — Spot {p.parking_loc}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateParking(p.vehicle_num)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteParking(p.vehicle_num)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;

