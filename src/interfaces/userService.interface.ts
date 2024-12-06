import { EditUserDto } from '../dto/editUser.dto';
import { User } from '../entities/user.entity';


export interface IUserService {
    editUser(id: string, editUserDto: EditUserDto): Promise<User>;
}