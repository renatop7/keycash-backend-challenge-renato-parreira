import { PickType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends PickType(CreateManagerDto, ['email', 'name', 'role'] as const) {}
