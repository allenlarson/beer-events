'use server';

import { revalidatePath } from 'next/cache';

import { connectToDatabase } from '@/lib/database';
import Brewery from '@/lib/database/models/brewery.model';
import User from '../database/models/user.model';
import { handleError } from '@/lib/utils';

import { CreateBreweryParams, UpdateBreweryParams } from '@/types';

const populateBrewery = (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({ path: 'brewery', select: '_id name' });
};

// GET ONE Brewery BY ID
export async function getBreweryById(id: string) {
  try {
    await connectToDatabase();

    const brewery = await Brewery.findById(id);

    if (!brewery) throw new Error('Brewery not found');

    return JSON.parse(JSON.stringify(brewery));
  } catch (error) {
    handleError(error);
  }
}

// CREATE
export async function createBrewery({
  userId,
  brewery,
  path,
}: CreateBreweryParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error('Organizer not found');

    const newBrewery = await Brewery.create({
      ...brewery,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newBrewery));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateBrewery({
  userId,
  brewery,
  path,
}: UpdateBreweryParams) {
  try {
    await connectToDatabase();

    const breweryToUpdate = await Brewery.findById(brewery._id);
    if (
      !breweryToUpdate ||
      breweryToUpdate.organizer.toHexString() !== userId
    ) {
      throw new Error('Unauthorized or brewery not found');
    }

    const updatedBrewery = await Brewery.findByIdAndUpdate(
      brewery._id,
      { ...brewery },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedBrewery));
  } catch (error) {
    handleError(error);
  }
}
