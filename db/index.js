const Sequelize = require('sequelize');
const { STRING, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dark_souls');
const faker = require('faker');

const Character = conn.define('character', {
  name: {
    type: STRING,
    validate: {
      notEmpty: true
    }
  },
  bio: TEXT
}, {
  hooks: {
    beforeCreate: (character)=> {
      character.bio = `${character.name} is ${character.bio} --${character.name}`;
    }
  }
});

const Covenant = conn.define('covenant', {
  name: STRING,
  description: TEXT
}, {
  hooks: {
    beforeCreate: (covenant)=> {
      covenant.description = `${covenant.name} is ${covenant.description} --${covenant.name}`;
    }
  }
});

Character.belongsTo(Covenant);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const _covenants = [
    {
      name: 'Warrior of Sunlight',
      description: 'Those that praise the sun and support others with light and healing.'
    },
    {
      name: 'Princess Guard',
      description: 'Those that swear fealty to Gwynevere, Princess of Sunlight.'
    },
    {
      name: 'Way of White',
      description: 'Those that wish to be drawn to others to assist them on their quests.'
    },
    {
      name: 'Darkwraith',
      description: 'Those that wish to take the humanity of other undead by force.'
    },
    {
      name: 'Forest Hunter',
      description: 'Those that wish to keep the forest safe from trespassers for Alvina of the Darkroot Wood.'
    },
    {
      name: 'Path of the Dragon',
      description: 'Those that swear allegiance to the Everlasting Dragon.'
    },
    {
      name: 'Blade of the Dark Moon',
      description: 'Those that serve Dark Sun Gwyndolin, the last remaining deity in Anor Londo.'
    },{
      name: 'Gravelord Servant',
      description: 'That that serve the Gravelord Nito and curse other undead'
    },{
      name: 'Chaos Servant',
      description: 'Those that serve the Daughter of Chaos'
    },
  ];
  const covenants = await Promise.all(_covenants.map(covenant => Covenant.create(covenant)));
  const _characters = [];
  _characters.push(Character.create({
    name: 'Solaire of Astora',
    covenantId: 1,
    bio: 'He is an exceptionally skilled warrior who purposefully became Undead so he could visit Lordran in his quest to find a sun of his own. A true Warrior of Sunlight.'
  }));
  while(_characters.length < 5){
    _characters.push(Character.create({ name: faker.name.firstName(), covenantId: faker.random.arrayElement(covenants).id, bio: faker.lorem.paragraphs(3) }));
  }
};

module.exports = {
  syncAndSeed,
  models: {
    Character,
    Covenant
  }
};
