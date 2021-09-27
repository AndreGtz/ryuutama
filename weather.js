const roll = (optionsNumber, min = 1) => {
  return min + Math.floor(Math.random() * (optionsNumber - min + 1));
};

const getTerrain = (lvl) => {
  const Terrains = [
    'grassland', // 0
    'wasteland', // 1
    'woods', // 2
    'highland', // 3
    'rocky', // 4
    'deep forest', // 5
    'swamp', // 6
    'mountain', // 7
    'desert', // 8
    'jungle', // 9
    'alpine', // 10
  ];

  switch(lvl) {
    case 1:
      return Terrains[roll(1, 0)];
    case 2:
      return Terrains[roll(4, 0)];
    case 3:
      return Terrains[roll(7, 0)];
    case 4:
      return Terrains[roll(9, 0)];
    case 5:
      return Terrains[roll(10, 0)];
  }
};

const getWeather = () => {
  const n = roll(100, 1);
  if (n >= 1 && n <= 20) {
    return 'clear';
  } else if (n >= 21 && n <= 30) {
    return 'cloudy';
  } else if (n >= 31 && n <= 40) {
    return 'hot';
  } else if (n >= 41 && n <= 50) {
    return 'cold';
  } else if (n >= 51 && n <= 60) {
    return 'rain';
  } else if (n >= 61 && n <= 70) {
    return 'strong wind';
  } else if (n >= 71 && n <= 80) {
    return 'fog';
  } else if (n >= 81 && n <= 85) {
    return 'hard rain';
  } else if (n >= 86 && n <= 90) {
    return 'snow';
  } else if (n >= 91 && n <= 95) {
    return 'deep fog';
  } else if (n >= 96 && n <= 97) {
    return 'hurricane';
  } else if (n >= 98 && n <= 100) {
    return 'blizzard';
  }
}

const [, , DaysOfTravel, Level] = process.argv;

if (DaysOfTravel === undefined || Level === undefined) {
  // console.log('node weather.js <DaysOfTravel> <Level>');
  throw new Error('node weather.js <DaysOfTravel> <Level>');
}

const getPool = () => {
  const weather = [];
  const terrain = [];
  for (let i = 0; i < parseInt(DaysOfTravel, 10); i+= 1) {
    const accuracy = roll(99) + 1;
    if (accuracy <= 70) {
      weather.push(getWeather());
    } else {
      const wrongCast = getWeather();
      const correctCast = getWeather();
      const cast = `wrong: ${wrongCast} - correct: ${correctCast}`;
      weather.push(cast);
    }
    terrain.push(getTerrain(parseInt(Level, 10)));
  }
  return {
    weather,
    terrain,
  };
};

const { weather, terrain } = getPool();
weather.forEach((w) => console.log(w));
terrain.forEach((t) => console.log(t));
