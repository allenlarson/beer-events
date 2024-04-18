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
import Dropdown from './Dropdown';
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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
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
                      placeholder="External URL"
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
