import sequelize from "../config/db.js";
import Movie from "./Movie.model.js";
import Actor from "./Actor.model.js";

Movie.belongsToMany(Actor, { through: "MovieActor" })
Actor.belongsToMany(Movie, { through: "MovieActor" })

export { Movie, Actor, sequelize };