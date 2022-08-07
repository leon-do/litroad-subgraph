import { BigInt } from "@graphprotocol/graph-ts"
import { LitRoad, Buy, Sell, Withdraw } from "../generated/LitRoad/LitRoad"
import { SellEntity, BuyEntity, WithdrawEntity } from "../generated/schema"

export function handleBuy(event: Buy): void {
  let buyer = new BuyEntity(event.params._itemId.toHexString() + "-" + event.params._buyer.toHexString());
  buyer.buyer = event.params._buyer;
  buyer.itemId = event.params._itemId;
  buyer.amount = event.params._amount;
  buyer.save();
}

export function handleSell(event: Sell): void {
  let seller = new SellEntity(event.params._itemId.toHexString());
  seller.itemId = event.params._itemId;
  seller.seller = event.params._seller;
  seller.investor = event.params._investor;
  seller.uri = event.params._uri;
  seller.price = event.params._price;
  seller.save();
}

export function handleWithdraw(event: Withdraw): void {
  let withdraw = new WithdrawEntity(event.transaction.hash.toHex() + "-" + event.params._to.toHexString() + "-" + event.params._amount.toHexString());
  withdraw.to = event.params._to;
  withdraw.amount = event.params._amount;
  withdraw.save();
}
