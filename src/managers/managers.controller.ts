import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Administradores')
@Controller({ path: 'managers', version: '1' })
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post()
  create(@Req() req, @Body() createManagerDto: CreateManagerDto) {
    if (!req.user.role) {
      throw new UnauthorizedException();
    }
    return this.managersService.create(createManagerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req) {
    if (!req.user.role) {
      throw new UnauthorizedException();
    }
    return this.managersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    if (!req.user.role) {
      throw new UnauthorizedException();
    }
    return this.managersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    if (!req.user.role) {
      throw new UnauthorizedException();
    }
    return this.managersService.update(+id, updateManagerDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    if (!req.user.role) {
      throw new UnauthorizedException();
    }
    return this.managersService.remove(+id);
  }
}
