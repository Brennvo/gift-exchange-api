import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateGroupDTO } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/:groupId')
  getGroup(@Request() req, @Param('groupId') groupId): Promise<any> {
    return this.groupService.getGroupById(req.user, groupId);
  }

  @Get()
  getGroups(@Request() req): Promise<Group[]> {
    return this.groupService.getUserGroups(req.user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createGroup(
    @Request() req,
    @Body() createGroupDto: CreateGroupDTO,
  ): Promise<Group> {
    return this.groupService.createGroup(req.user, createGroupDto);
  }

  // @Patch('/:groupId')
  // @UsePipes(ValidationPipe)
  // updateGroup(
  //   @Param('groupId', ParseIntPipe) groupId: number,
  //   @Body() updateGroupDto: UpdateGroupDTO,
  // ): Promise<Group> {
  //   return this.groupService.updateGroup(groupId, updateGroupDto);
  // }
}
