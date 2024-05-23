import { Model, Sequelize } from "sequelize";

enum CharacterRoles {
  Support = "support",
  Tank = "tank",
  Damage = "damage",
}

interface CharacterAttributes {
  CharacterId: string;
  Nombre: string;
  Rol: CharacterRoles;
  Vida: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Character
    extends Model<CharacterAttributes>
    implements CharacterAttributes
  {
    public CharacterId!: string;
    public Nombre!: string;
    public Rol!: CharacterRoles;
    public Vida!: number;

    static associate(models: any) {
      //
    }
  }
  Character.init(
    {
      CharacterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Rol: {
        type: DataTypes.ENUM,
        values: Object.values(CharacterRoles),
        allowNull: false,
      },
      Vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Personaje",
    }
  );
  return Character;
};
