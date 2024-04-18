import mongoose from "mongoose";

const CoworkingSpaceSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
  },
  address: {
      type: String,
      required: [true, 'Please add an address']
  },
  district: {
      type: String,
      required: [true, 'Please add a district']
  },
  province: {
      type: String,
      required: [true, 'Please add a province']
  },
  image: {
    type: String,
    required: [true, 'Please add a URL']
  },
  tel: {
      type: String,
      required: [true, 'Please add a telephone number']
  },
  opentime:{
      type: String,
      required: [true, 'Please add a opening time']
  },
  closetime:{
      type: String,
      required: [true, 'Please add a closing time']
  },
  rate: {
    type: String,
    required: [true, 'Please add a reservation rate']
}
},
  );

  const CwsSchema = mongoose.models.CoworkingSpace || mongoose.model("CoworkingSpace", CoworkingSpaceSchema);
  export default CwsSchema;