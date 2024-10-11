import { Schema, model } from 'mongoose';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: false, match: emailRegex },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      required: true,
      enum: ['home', 'personal', 'work'],
      default: 'personal',
    },
    userId: { type: Schema.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Contact = model('contacts', contactSchema);
