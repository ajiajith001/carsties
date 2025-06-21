using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("---> Consuming auction finished");

        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        if (auction == null)
        {
            // Optionally log or handle the missing auction case
            return;
        }

        if (context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount ?? 0;
        }

        auction.Status = "Finished";

        await auction.SaveAsync();
    }
}
