const order = require("../utils/orderBy");
class ContainerDAO {
  constructor(model) {
    this.model = model;
  }

  async getAll(options) {
    try {
      const data = await this.model.paginate({}, options);
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
  async getById(id) {
    try {
      const data = await this.model.findById(id);
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
  async getOne(query) {
    try {
      const data = await this.model.findOne(query);
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
  async getByQuery(query, options) {
    try {
      const data = await this.model.paginate(query, options);
      return data;
    } catch (error) {
      console.log(error);
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }

  async save(newData) {
    try {
      const createModel = new this.model(newData);
      const data = await createModel.save();
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }

  async updateById(id, query) {
    try {
      const data = await this.model.findByIdAndUpdate(id, query, { new: true });
      return data;
    } catch (error) {
      throw { status: 500, message: "Ha ocurrido un error" };
    }
  }
}

module.exports = ContainerDAO;
