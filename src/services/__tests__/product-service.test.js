const Chance = require("chance");

const ProductService = require("../products");

const Product = require("../../models/product");

const chance = new Chance();

jest.mock("../../models/product");

describe("when calling the product service method", () => {
  let id, productData, updatedProduct;

  beforeEach(() => {
    id = chance.guid();
    productData = {
      name: chance.name(),
      describe: chance.string(),
    };
    updatedProduct = productData;

    Product.findByIdAndUpdate = jest.fn().mockReturnThis();
    Product.lean = jest.fn().mockReturnThis();
    Product.exec = jest.fn().mockResolvedValue(updatedProduct);
  });

  it("should call Product.findByIdAndUpdate with the id, product data and return document new property", async () => {
    await ProductService.updateProduct(id, productData);

    expect(Product.findByIdAndUpdate).toBeCalledWith(id, productData, {
      new: true,
    });
  });

  it("should call Product.lean", async () => {
    await ProductService.updateProduct(id, productData);

    expect(Product.lean).toBeCalled();
  });

  it("should call Product.exec", async () => {
    await ProductService.updateProduct(id, productData);

    expect(Product.exec).toBeCalled();
  });

  it("should return the updated product data", async () => {
    const result = await ProductService.updateProduct(id, productData);

    expect(result).toEqual(updatedProduct);
  });
});

describe("when calling the product delete method", () => {
  let id;

  beforeEach(() => {
    id = chance.string();

    Product.findByIdAndDelete = jest.fn().mockReturnThis();
    Product.exec = jest.fn().mockResolvedValue();
  });

  it("should call deleteProduct with an ID property", async () => {
    await ProductService.deleteProject(id);
    expect(Product.findByIdAndDelete).toBeCalledWith(id);
  });
});