import { Controller, Get } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller("tags")
export class TagController {
  constructor(private tagService: TagService) {
  }

  @Get()
  async find(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAllTags();
    return {
      tags: tags.map(item => item.name)
    };
  }
}
