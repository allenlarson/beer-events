import { Document, Schema, model, models } from 'mongoose';

export interface IBrewery extends Document {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  url: string;
  organizer: { _id: string; firstName: string; lastName: string };
}

const BrewerySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageUrl: { type: String, required: true },
  url: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Brewery = models.Brewery || model('Brewery', BrewerySchema);

export default Brewery;
