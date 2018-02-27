function deg2rad(deg): number {
    return deg * (Math.PI/180);
  }
   
  function getDistanceInKm( lat1: number, lon1: number, lat2: number, lon2: number ) : number {
           
    let R: number = 6371; // Earth's radius (km)
   
    let dLat: number = deg2rad(lat2 - lat1);
    let dLon: number = deg2rad(lon2 - lon1); 
   
    let a: number = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d: number = R * c; // Distance in km
    return d;
  }
   
  // Testing: distance between Mexico city and Queretaro
  document.body.innerHTML = String(getDistanceInKm(-6.9175, 107.6191, -7.0051, 110.4381));