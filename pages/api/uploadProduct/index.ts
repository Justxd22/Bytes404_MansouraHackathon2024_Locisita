import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { IncomingForm, Files as FormidableFiles } from "formidable";
import { uploadProduct } from '@/app/models/Products';
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable body parser as formidable is used
  },
};

// Custom type to better match the expected file structure
interface CustomFiles {
  image?: formidable.File | formidable.File[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const form = new IncomingForm({ uploadDir: "../public/uploads", keepExtensions: true });
  
    return new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files: FormidableFiles & CustomFiles) => {
        try {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Error processing upload" });
            return reject(err);
          }
  
          // Handle fields
          const productName = Array.isArray(fields.productName)
            ? fields.productName[0]
            : fields.productName;
          const price = Array.isArray(fields.price)
            ? fields.price[0]
            : fields.price;
  
          if (!productName || !price) {
            res.status(400).json({ message: "Missing fields" });
            return resolve();
          }
  
          // Handle file upload (ensure image exists)
          const imageFile = Array.isArray(files.image)
            ? files.image[0]
            : files.image;
  
          if (!imageFile) {
            res.status(400).json({ message: "Missing image file" });
            return resolve();
          }
  
          // Prepare the product data
          const productData = {
            productName,
            price: parseFloat(price),
            imagePath: `/uploads/${imageFile.newFilename}`,
          };
  
          // Call the uploadProduct method to insert product into the database
          const result = await uploadProduct(req, files, productData);
  
          if (result.err) {
            res.status(500).json({ message: result.err });
            return resolve();
          }
  
          res.status(200).json({ 
            message: "Product uploaded successfully", 
            productId: result.productId 
          });
  
          resolve();
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
          reject(error);
        }
      });
    });
  };

export default handler;