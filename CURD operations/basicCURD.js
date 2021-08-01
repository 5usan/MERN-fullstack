const express = require("express");

const create = async (dataSchema, params) => {
  try {
    const newData = new dataSchema(params);
    const isCreated = await newData.save();
    return isCreated;
  } catch (err) {
    return {};
  }
};

const readAll = async (dataSchema) => {
  try {
    const getData = await dataSchema.find();
    return getData;
  } catch (err) {
    return {};
  }
};

const readOne = async (dataSchema, params) => {
  try {
    const getData = await dataSchema.findById({ _id: params });
    return getData;
  } catch (err) {
    return {};
  }
};

const update = async (dataSchema, params, data) => {
  try {
    const updateData = dataSchema.findByIdAndUpdate(
      { _id: params },
      {
        $set:  data,
      }
    );
    return updateData;
  } catch (err) {
    return {};
  }
};

const destroy = async (dataSchema, params) => {
  try {
    const deleteData = await dataSchema.findByIdAndDelete({ _id: params });
    return deleteData;
  } catch (err) {
    return {};
  }
};
 //By name
const destroyMany = async(dataSchema, params) => {
  try{
    const getData = await dataSchema.deleteMany({name: params});
    return getData;
  }catch(err){
    return {};
  }
};
module.exports = { create, readAll, readOne, update, destroy, destroyMany };
