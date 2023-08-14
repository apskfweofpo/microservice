import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePostCommand } from "@lib/post/application-services/commands/delete-post/delete-post.command";
import { PostRepository } from "@lib/post/providers";
import { PostAggregate } from "@lib/post";
import { BadRequestException, Logger } from "@nestjs/common";
import {
  UpdatePostCommandHandler
} from "@lib/post/application-services/commands/update-post/update-post.command-handler";

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler implements ICommandHandler<DeletePostCommand, boolean> {

  private readonly logger = new Logger(UpdatePostCommandHandler.name);

  constructor(public readonly postRepository: PostRepository) {
  }

  async execute({ id }: DeletePostCommand): Promise<boolean | void> {
    const existPost = await this.postRepository
      .findOne(id).catch(err => {
        this.logger.error(err);
        return null as PostAggregate;
      });
    if (!existPost) {
      throw new BadRequestException(`Post by id ${id} not found!`);
    }
    const isPostDeleted = await this.postRepository.delete(id).catch(err => {
      throw new Error(err);
    });
    return isPostDeleted;
  }
}