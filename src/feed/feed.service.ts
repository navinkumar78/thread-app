import { Injectable } from '@nestjs/common';
import { ThreadsService } from '../threads/threads.service';
import { FollowsService } from '../follows/follows.service';

@Injectable()
export class FeedService {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly followsService: FollowsService,
  ) {}

  async getUserFeed(userId: string, page = 1, limit = 20) {
    const followingDocs = await this.followsService.listFollowing(userId); // returns array of userIds
    console.log(followingDocs);
    const following = followingDocs.map(doc => doc.following.toString());


    const skip = (page - 1) * limit;

    const threads = await this.threadsService.findByAuthors(following, skip, limit);
    const total = await this.threadsService.countByAuthors(following);

    return { page, limit, total, threads };
  }

  async getTrendingFeed(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const threads = await this.threadsService.findTrending(skip, limit);
    const total = await this.threadsService.countAll();
    return { page, limit, total, threads };
  }
}
