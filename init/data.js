const sampleListings = [
  {
    title: 'Cozy Cottage in the Woods',
    description: 'A peaceful retreat surrounded by nature.',
    image: {
      filename: 'cottage1',
      url:  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 120,
    location: 'Asheville',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-82.5515, 35.5951],
    },
  },
  {
    title: 'Modern Loft Downtown',
    description: 'Enjoy city living in this stylish loft.',
    image: {
      filename: 'loft1',
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 200,
    location: 'New York',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-74.0060, 40.7128],
    },
  },
  {
    title: 'Beachside Bungalow',
    description: 'Steps away from the ocean with amazing views.',
    image: {
      filename: 'beach1',
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 180,
    location: 'Malibu',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-118.7798, 34.0259],
    },
  },
  {
    title: 'Mountain Cabin Getaway',
    description: 'Perfect for hiking and mountain views.',
    image: {
      filename: 'cabin1',
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 150,
    location: 'Denver',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-104.9903, 39.7392],
    },
  },
  {
    title: 'Charming Countryside House',
    description: 'A quiet place to relax and unwind.',
    image: {
      filename: 'country1',
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 100,
    location: 'Cotswolds',
    country: 'UK',
    geometry: {
      type: 'Point',
      coordinates: [-1.7781, 51.8330],
    },
  },
  {
    title: 'Ski Chalet',
    description: 'Close to the slopes, ideal for winter sports.',
    image: {
      filename: 'ski1',
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 220,
    location: 'Aspen',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-106.8231, 39.1911],
    },
  },
  {
    title: 'Urban Flat in Berlin',
    description: 'Modern amenities in a historic city.',
    image: {
      filename: 'berlin1',
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 130,
    location: 'Berlin',
    country: 'Germany',
    geometry: {
      type: 'Point',
      coordinates: [13.4050, 52.5200],
    },
  },
  {
    title: 'Lakefront House',
    description: 'Breathtaking lake views and peaceful surroundings.',
    image: {
      filename: 'lake1',
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 170,
    location: 'Lake Tahoe',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-120.0435, 39.0968],
    },
  },
  {
    title: 'Rustic Barn Stay',
    description: 'Experience country life in a cozy barn.',
    image: {
      filename: 'barn1',
      url:  "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 90,
    location: 'Lancaster',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-76.3055, 40.0379],
    },
  },
  {
    title: 'Tropical Treehouse',
    description: 'Sleep among the trees in a tropical paradise.',
    image: {
      filename: 'treehouse1',
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 140,
    location: 'Hana',
    country: 'USA',
    geometry: {
      type: 'Point',
      coordinates: [-155.9947, 20.7619],
    },
  },
];


module.exports = { data: sampleListings };