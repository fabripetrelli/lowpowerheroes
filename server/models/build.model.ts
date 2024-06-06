import mongoose from 'mongoose'

const BuildSchema = new mongoose.Schema(
  {
    build_name: {
      type: String,
      required: [true, `name it's required`],
    },
    build_description: {
      type: String,
      required: [true, `description is required`],
    },
    build_imgs: {
      type: [
        {
          fileName: String,
          data: Buffer,
          contentType: String,
        },
      ],
      required: [true, 'imgs are required'],
    },
  },
  { timestamps: true }
)

export const Build = mongoose.model('Build', BuildSchema)
