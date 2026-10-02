const productService = require("../services/productService");
const {
    setCache,
    clearCache
} = require("../middleware/cacheMiddleware");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        setCache("/products", products);

        return res.json(products);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        setCache(`/products/${id}`, product);

        return res.json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);

        clearCache();

        return res.status(201).json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function updateProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

     
        clearCache();

        return res.json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.updateProduct(
            id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        return res.json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

      
        clearCache();

        return res.json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};