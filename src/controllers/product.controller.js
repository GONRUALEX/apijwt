import Product from '../models/Product';

export const createProduct = async (req,res)=>{

    try{

   const {name, category, price, imgURL} = req.body;
  
    
   const newProduct = new Product({name,category,price,imgURL});

   const productSave = await newProduct.save();

   res.status(201).json(productSave);

    }catch (err){
        console.log("error Al añadir producto", err)
    }

}

export const getProduct =async (req,res)=>{
    const data =await  Product.find();
    
    res.status(200).json(data);
}

export const getProductById = async (req,res)=>{
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}

export const updateProductById = async (req,res)=>{
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId,req.body,{
        new : true
    });
    res.status(200).json(updateProduct);
}

export const deleteProductById = async (req,res)=>{
    const {productId} = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(204).json();
}
