import { Document, Schema, model, models } from 'mongoose';

export interface IBrewery extends Document {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  url: string;
  organizer: { _id: string; firstName: string; lastName: string };
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  hhMonday?: string;
  hhTuesday?: string;
  hhWednesday?: string;
  hhThursday?: string;
  hhFriday?: string;
  hhSaturday?: string;
  hhSunday?: string;
  onTapUrl?: string;
  happyHour?: string;
  facebook?: string;
  instagram?: string;
  untappd?: string;
  slug: string;
  city: string;
}

const BrewerySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageUrl: { type: String, required: true },
  url: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  monday: { type: String },
  tuesday: { type: String },
  wednesday: { type: String },
  thursday: { type: String },
  friday: { type: String },
  saturday: { type: String },
  sunday: { type: String },
  hhMonday: { type: String },
  hhTuesday: { type: String },
  hhWednesday: { type: String },
  hhThursday: { type: String },
  hhFriday: { type: String },
  hhSaturday: { type: String },
  hhSunday: { type: String },
  onTapUrl: { type: String },
  happyHour: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  untappd: { type: String },
  slug: { type: String },
  city: { type: String },
});

const Brewery = models.Brewery || model('Brewery', BrewerySchema);

export default Brewery;
