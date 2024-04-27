'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { breweryFormSchema } from '@/lib/validator';
import { z } from 'zod';
import { breweryDefaultValues } from '@/constants';
import { Textarea } from '../ui/textarea';
import { FileUploader } from './FileUploader';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { useUploadThing } from '@/lib/uploadthing';

import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '../ui/checkbox';
import { useRouter } from 'next/navigation';
import { IBrewery } from '@/lib/database/models/brewery.model';
import { createBrewery, updateBrewery } from '@/lib/actions/brewery.actions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type BreweryFormProps = {
  userId: string;
  type: 'Create' | 'Update';
  brewery?: IBrewery;
  breweryId?: string;
};

const BreweryForm = ({
  userId,
  type,
  brewery,
  breweryId,
}: BreweryFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    brewery && type === 'Update'
      ? {
          ...brewery,
        }
      : breweryDefaultValues;

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  // 1. Define your form.
  const form = useForm<z.infer<typeof breweryFormSchema>>({
    resolver: zodResolver(breweryFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof breweryFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newBrewery = await createBrewery({
          brewery: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile',
        });

        if (newBrewery) {
          form.reset();
          router.push(`/brewery/${newBrewery._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === 'Update') {
      if (!breweryId) {
        router.back();
        return;
      }

      try {
        const updatedBrewery = await updateBrewery({
          userId,
          brewery: { ...values, imageUrl: uploadedImageUrl, _id: breweryId },
          path: `/brewery/${breweryId}`,
        });

        if (updatedBrewery) {
          form.reset();
          router.push(`/brewery/${updatedBrewery._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Brewery Name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Slug"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Brewery description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Location"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select>
                    <SelectTrigger className="select-field">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          value="apple"
                          className="select-item p-regular-14"
                        >
                          Apple
                        </SelectItem>
                        <SelectItem
                          value="banana"
                          className="select-item p-regular-14"
                        >
                          Banana
                        </SelectItem>
                        <SelectItem
                          value="blueberry"
                          className="select-item p-regular-14"
                        >
                          Blueberry
                        </SelectItem>
                        <SelectItem
                          value="grapes"
                          className="select-item p-regular-14"
                        >
                          Grapes
                        </SelectItem>
                        <SelectItem
                          value="pineapple"
                          className="select-item p-regular-14"
                        >
                          Pineapple
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="onTapUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="On Tap Url (Your Website)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder="Website URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/facebook.svg"
                      alt="facebook"
                      width={20}
                      height={20}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="Facebook URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/instagram.svg"
                      alt="instagram"
                      width={20}
                      height={20}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="Instagram URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="untappd"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/untappd.svg"
                      alt="untappd"
                      width={20}
                      height={20}
                      className="filter-grey"
                    />
                    <Input
                      placeholder="Untappd URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex flex-col gap-5 w-full p-8 rounded-xl border-gray-50 border-2">
            <h3 className="">Hours of Operation</h3>

            <FormField
              control={form.control}
              name="monday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/monday.svg"
                        alt="monday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Monday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tuesday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/tuesday.svg"
                        alt="tuesday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Tuesday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wednesday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/wednesday.svg"
                        alt="wednesday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Wednesday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thursday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/thursday.svg"
                        alt="thursday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Thursday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="friday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/friday.svg"
                        alt="friday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Friday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saturday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/saturday.svg"
                        alt="saturday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Saturday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sunday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/sunday.svg"
                        alt="sunday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Sunday Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 w-full p-8 rounded-xl border-gray-50 border-2">
            <h3 className="">Happy Hours</h3>

            <FormField
              control={form.control}
              name="hhMonday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/monday.svg"
                        alt="monday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Monday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhTuesday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/tuesday.svg"
                        alt="tuesday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Tuesday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhWednesday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/wednesday.svg"
                        alt="wednesday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Wednesday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhThursday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/thursday.svg"
                        alt="thursday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Thursday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhFriday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/friday.svg"
                        alt="friday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Friday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhSaturday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/saturday.svg"
                        alt="saturday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Saturday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hhSunday"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/sunday.svg"
                        alt="sunday"
                        width={20}
                        height={20}
                        className="filter-grey"
                      />
                      <Input
                        placeholder="Sunday Happy Hours ex: 12PM - 9PM"
                        {...field}
                        className="input-field"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Brewery`}
        </Button>
      </form>
    </Form>
  );
};

export default BreweryForm;
