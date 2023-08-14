import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SetPublishedCommand } from "@lib/post/application-services/commands/set-published/set-published.command";
import { PostAggregate } from "@lib/post";
import { PostRepository } from "@lib/post/providers";
import { BadRequestException, Logger } from "@nestjs/common";
import {
  UpdatePostCommandHandler
} from "@lib/post/application-services/commands/update-post/update-post.command-handler";

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler
  implements ICommandHandler<SetPublishedCommand, PostAggregate> {
  private readonly logger = new Logger(UpdatePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({id}: SetPublishedCommand): Promise<PostAggregate> {
    const existPost = await this.postRepository.findOne(id).catch(err => {
      this.logger.error(err)
      return null as PostAggregate;
    });
    if (!existPost) {
      throw new BadRequestException(`Post by id ${id} not found!`);
    }

    const postAggregate = PostAggregate.create(existPost);
    postAggregate.setPublished();
    await this.postRepository.save(postAggregate);
    return postAggregate;
  }

}