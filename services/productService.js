const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");

async function getAllProducts() {
   
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return await readProducts();
}

async function getProductById(id) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    const products = await readProducts();

    return products.find((product) => product.id === id);
}

async function createProduct(product) {
    const products = await readProducts();

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name: product.name,
        price: product.price
    };

    products.push(newProduct);

    await writeProducts(products);

    return newProduct;
}

async function updateProduct(id, data) {
    const products = await readProducts();

    const index = products.findIndex(
        (product) => product.id === id
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data,
        id
    };

    await writeProducts(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex(
        (product) => product.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};