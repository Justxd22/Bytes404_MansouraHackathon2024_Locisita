import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import db from "../lib/manga";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest } from "next";

const products = db.collection("products");

// Define the Product interface
interface Product {
  _id?: ObjectId;
  productName: string;
  price: number;
  imagePath: string;
  listingDate?: Date;
}

export async function getAllProducts() {
  return await products.find({}).toArray();
}

export async function getProductById(productId: string) {
  return await products.findOne({ _id: new ObjectId(productId) });
}

export async function createProduct(productData: Product) {
  // Ensure price is a number
  if (isNaN(productData.price)) {
    return { err: "Invalid price." };
  }

  // Insert product data into the products collection
  const result = await products.insertOne({
    ...productData,
    listingDate: new Date(),
  });

  return { productId: result.insertedId };
}

export async function uploadProduct(req: NextApiRequest, files: any, data: Product) {
  // Assume 'files' contains information about the uploaded image
//   console.log('RRRRR', req);
  const { productName, price } = data;

  // Validate required fields
  if (!productName || !price || !files.image) {
    return { err: "Product name, price, and image are required." };
  }

  // Prepare the product data
  const productData: Product = {
    productName,
    price: parseFloat(price as Number),
    imagePath: `/uploads/${files.image.newFilename}`, // Save the image path
    listingDate: new Date(),
  };

  // Save the product to the database
  const result = await createProduct(productData);

  if (result.err) {
    return result;
  }

  return { success: "Product uploaded successfully.", productId: result.productId };
}

export async function updateProduct(id: string, updateData: Product) {
  const result = await products.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result.modifiedCount === 1) {
    return { success: "Product updated successfully." };
  } else {
    return { err: "Failed to update product." };
  }
}

export async function deleteProduct(id: string) {
  const result = await products.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 1) {
    return { success: "Product deleted successfully." };
  } else {
    return { err: "Failed to delete product." };
  }
}
