import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userRepository.findOne({
      user_name: createUserDto.user_name,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'username or email already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ['user_id', 'email', 'password', 'profile_image'] },
    );
    if (!user) {
      throw new HttpException(
        'email or password incorrect please try again later',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordMatched = compare(loginUserDto.password, user.password);
    if (!isPasswordMatched) {
      throw new HttpException(
        'email or password incorrect please try again later',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    delete user.password;
    return user;
  }

  async findById(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ user_id: userId });
  }
  generateJwt(user: UserEntity): string {
    return sign({ user_id: user.user_id, email: user.email }, 'random');
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return { user: { ...user, token: this.generateJwt(user) } };
  }
}
