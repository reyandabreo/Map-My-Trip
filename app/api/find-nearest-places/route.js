
import { Client } from 'pg';
// filepath: /run/media/reyandabreo/Projects/Mini_Project/Map-My-Trip/app/api/find-nearest-places/route.js

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export async function POST(req) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres123",
    database: "places",
  });

  try {
    const body = await req.json();
    const { latitude, longitude, placeName } = body;

    await client.connect();

    // Fetch places matching the address filter
    const result = await client.query(
      `SELECT * FROM places WHERE LOWER(address) LIKE $1`,
      [`%${placeName.toLowerCase()}%`]
    );

    // Calculate distances
    const placesWithDistance = result.rows.map((place) => {
      const distance = haversine(
        latitude,
        longitude,
        parseFloat(place.latitude),
        parseFloat(place.longitude)
      );
      return { ...place, distance };
    });

    // Sort by distance
    const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);

    return new Response(JSON.stringify(sortedPlaces.slice(0, 10)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching places:', err.message);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.end();
  }
}


/*
const {Client} = require('pg')

const client = new Client({
  host:"localhost",
  user:"postgres",
  port:5432,
  password:"",
  database:"places"
})

client.connect();
client.query(`select * from places`, (err,res)=>{
  if(!err){
    console.log(res.rows);
  }
  else{
    console.log(err.message);
  }
  client.end;
})
*/

