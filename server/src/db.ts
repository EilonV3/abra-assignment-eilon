export let db = [
  {
    id: 1,
    name: "Monti",
    type: "Hotel",
    address: { lat: 32.0853, lng: 34.7818 },
  },
  {
    id: 2,
    name: "Falafel",
    type: "Restaurant",
    address: { lat: 32.109333, lng: 34.855499 },
  },
  {
    id: 3,
    name: "Sabich",
    type: "Restaurant",
    address: { lat: 37.109333, lng: 35.855499 },
  },
];

export let nextId = 11;

module.exports = { db, nextId };
