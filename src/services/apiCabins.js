import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldnt be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasNewImage = newCabin.image instanceof File;

  let imageName;
  let imagePath = newCabin.image;

  // New image selected
  if (hasNewImage) {
    imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
      "/",
      "",
    );

    imagePath =
      supabaseUrl + `/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let query = supabase.from("cabins");

  // Create
  if (!id) {
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ]);
  }

  // Edit
  if (id) {
    query = query
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be saved");
  }

  // Upload only when a new image was selected
  if (hasNewImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Image could not be uploaded");
    }
  }

  return data;
}