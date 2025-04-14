import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async register(data: { email: string; full_name: string; password: string }) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        full_name: data.full_name,
        password_hash: hashedPassword,
        role: 'user',
      },
    });
  }
}