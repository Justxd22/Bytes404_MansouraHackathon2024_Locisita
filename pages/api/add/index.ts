import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

// Define the type for a product
type Product = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  quantityAvailable: number;
  category: string;
  currentPrice?: number;
  sizes?: string[];
  colors?: string[];
  images?: string[];
  punctuation?: object;
  reviews?: object[];
};

const filePath = path.join(process.cwd(), 'utils/data', 'products.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const products: Product[] = JSON.parse(data);

    const { productName, description, price, category, stock, image } = req.body;

    if (!productName || !price || !category || !stock || !image) {
        console.log(!productName , !price , !category , !stock , !image);
        console.log(productName, price, category, stock)
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: productName,
      price: parseFloat(price),
      quantityAvailable: parseInt(stock, 10),
      category,
      images: [image],
    };

    products.push(newProduct);

    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');

    res.status(200).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Failed to save product' });
  }
}
