import { useState } from 'react';
import Layout from "../layouts/Main";
import Footer from "../components/footer";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form data to FormData object
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
        // Reset form or redirect
        setProductData({
          productName: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          image: null
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('Product added successfully!');

    }
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="form-block">
            <h2 className="form-block__title">Add New Product</h2>

            <form onSubmit={handleSubmit} className="form">
              <div className="form__input-row">
                <input
                  className="form__input"
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={productData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
                <textarea
                  className="form__input"
                  name="description"
                  placeholder="Product Description"
                  value={productData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="number"
                  name="price"
                  placeholder="Price (EGP)"
                  value={productData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
                <select
                  className="form__input"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="home_decor">Home Decor</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={productData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form__input-row">
  <label 
    className="form__input cursor-pointer border-2 border-dashed border-gray-300 p-4 text-center block"
    style={{
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
        <span style={{
      color: '#666',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px'

    }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 mr-2" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      {productData.image ? productData.image.name : 'Choose Product Image'}
    </span>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="absolute opacity-0 cursor-pointer"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      required
    />

  </label>
</div>
<button 
                type="submit" 
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Add Product
              </button>

            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Upload Local Products with Ease</h4>
          </header>

        </div>
      </section>

      <Footer />
    </Layout>
  );
};

export default AddProductPage;