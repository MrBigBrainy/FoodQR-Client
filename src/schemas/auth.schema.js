// client/src/schemas/auth.schema.js
import { z } from 'zod';

/** ---------- COMMON ---------- **/
const thaiPhone = z
  .string()
  .trim()
  .regex(/^0\d{9}$/, {
    message: 'เบอร์โทรต้องขึ้นต้นด้วย 0 และมี 10 หลัก',
  });

/** ---------- LOGIN ---------- **/
export const loginSchema = z.object({
  userName: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
  password: z.string().min(5, 'รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร'),
});

/** ---------- REGISTER ---------- **/
export const registerSchema = z
  .object({
    fullName: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
    userName: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้'),
    phoneNumber: thaiPhone,

    password: z
      .string()
      .min(5, { message: 'รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร' })
      .max(100, { message: 'รหัสผ่านต้องไม่เกิน 100 ตัวอักษร' }),

    confirmPassword: z.string().min(1, { message: 'โปรดยืนยันรหัสผ่าน' }),

    adminCode: z.string().min(1, 'กรุณากรอกรหัสสมัคร Admin'),

    role: z.string().default('admin'),
    storeId: z.coerce.number().default(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'รหัสผ่านไม่ตรงกัน',
  });
//   .transform((data) => {
//     const result = { ...data };
//     delete result.confirmPassword;
//     return result;
//   });
