import { setPassword } from 'src/util/password-helper';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export async function mapUserToDTO(
  user: CreateUserDto,
): Promise<CreateUserDto> {
  const userDTO = new User();
  userDTO.email = user.email;
  userDTO.password = await setPassword(user.password);
  userDTO.name = user.name;
  userDTO.userType = user.userType;
  return userDTO;
}
