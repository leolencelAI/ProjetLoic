import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { firstname, name, password, email } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité user
    const user = this.userRepository.create({
      firstname,
      name,
      password: hashedPassword,
      email,
      admin: false,
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      delete createdUser.admin;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    const admin = user?.admin;

    //If faut préciser les erreurs | cas ou le mdp n'est pas bon
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { admin: admin, user: user.email, sub: user.id_users };
      const accessToken = await this.jwtService.sign(payload);

      // delete user.id_users;
      delete user.password;
      delete user.admin;

      return { accessToken, admin, user };
    } else if (!user) {
      throw new UnauthorizedException(
        "Aucun compte n'est lié à cette adresse email",
      );
    } else {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
  }
}
