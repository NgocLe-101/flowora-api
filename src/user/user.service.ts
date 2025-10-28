import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;
        const existing = await this.findByEmail(email);
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, password: hashed });

        try {
            await this.usersRepository.save(user);
            // remove password before returning (class-transformer will also exclude)
            // but we can return limited fields:
            return { id: user.id, email: user.email, createdAt: user.createdAt };
        } catch (err) {
            // More granular DB error handling is possible (e.g., check err.code)
            throw new InternalServerErrorException('Failed to create user');
        }
    }
}
