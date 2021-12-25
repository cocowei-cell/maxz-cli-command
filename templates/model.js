module.exports = ModelTem = (name = "") => {
  const Uppername = name[0].toUpperCase() + name.substr(1);
  return (
    `import * as Mongoose from 'mongoose';
export interface ${Uppername}Schema {};

const Schema = new Mongoose.Schema(
  {
    demo1: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    demo2: {
      type: String,
      default: '',
      require: true,
    },
  },
  { versionKey: false }
);
export const ${Uppername} = Mongoose.model<Partial<${Uppername}Schema & { _id: Mongoose.ObjectId }>>('${name}', Schema);`)
}