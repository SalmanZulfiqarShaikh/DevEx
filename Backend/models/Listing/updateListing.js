const { z } = require('zod');

const updateListingSchema = z.object({
 
    title: z.string({ invalid_type_error: 'Title must be a string' }).trim().min(1, 'Title cannot be empty').max(80, 'Title cannot exceed 80 characters').optional(),
    description: z.string({ invalid_type_error: 'Description must be a string' }).trim().min(1, 'Description cannot be empty').max(1000, 'Description cannot exceed 1000 characters').optional(),
    price: z.number({ invalid_type_error: 'Price must be a number' }).min(0, 'Price cannot be negative').optional(),
    category: z.enum(['Productivity', 'Dev Tools', 'Marketing', 'Finance', 'Other'],{ errorMap: () => ({ message: 'Category must be one of: Productivity, Dev Tools, Marketing, Finance, Other' }) }).optional(),
    demoUrl: z.string({ invalid_type_error: 'demoUrl must be a string' }).url('demoUrl must be a valid URL (e.g. https://demo.com)').optional(),

}).strict({ message: 'Unknown fields are not allowed' }) // rejects extra fields like sellerId
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'At least one field must be provided to update' }
  );

module.exports = updateListingSchema;