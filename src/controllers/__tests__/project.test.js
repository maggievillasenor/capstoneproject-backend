const Chance = require("chance");

//What we want to test
const ProductController = require("../product");

//Dependencies
const ProductService = require("../../services/products");

const chance = new Chance();

//Mock dependencies
jest.mock("../../services/products");

describe("when calling update product controller", () => {
    let id, productData, updatedProduct, req, res;

    beforeEach(() => {
        id = chance.guid();
        productData = {
            name: chance.name(),
            description: chance.string(),
        };
        updatedProduct = productData;
        req = {
            params: { id },
            body: productData,
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        global.console = { log: jest.fn(), error: jest.fn() };3

        ProductService.updateProduct = jest.fn().mockResolvedValue(updatedProduct);
    });

    it("should call ProductService.updatProduct with the id and productData", async () => {
        //ACT
        await ProductController.updateProduct(req, res);

        //ASSERT
        expect(ProductService.updateProduct).toHaveBeenCalledWith(id, productData);
    });

    it("should call res.status with a 200 status code", async () => {
        await ProductController.updateProduct(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
      });
    
      it("should call res.json with the updated product data", async () => {
        await ProductController.updateProduct(req, res);
    
        expect(res.json).toHaveBeenCalledWith(updatedProduct);
      });
    
      it("should call res.status with 500 when the ProductService.updateProduct service fails", async () => {
        //ARRANGE
        const error = new Error();
        ProductService.updateProduct = jest.fn().mockRejectedValue(error);
    
        //ACT
        await ProductController.updateProduct(req, res);
    
        //ASSERT
        expect(res.status).toHaveBeenCalledWith(500);
      });

});