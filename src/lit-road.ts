import { BigInt } from "@graphprotocol/graph-ts";
import { LitRoad, Buy, Sell, Withdraw } from "../generated/LitRoad/LitRoad";
import { Item, Purchase, Withdrawal, Balance } from "../generated/schema";

export function handleBuy(event: Buy): void {
  let buy = new Purchase(event.params._itemId.toHexString() + "-" + event.params._buyer.toHexString());
  buy.buyer = event.params._buyer;
  buy.itemId = event.params._itemId;
  buy.amount = event.params._amount;
  buy.transactionHash = event.transaction.hash;
  buy.save();

  let litRoad = LitRoad.bind(event.address);

  let sellerAddress = litRoad.items(event.params._itemId).value0;
  let seller = Balance.load(sellerAddress.toHexString());
  if (seller == null) {
    seller = new Balance(sellerAddress.toHexString());
    seller.address = sellerAddress;
  }
  seller.balance = litRoad.balances(sellerAddress);
  seller.save();

  let investorAddress = litRoad.items(event.params._itemId).value1;
  let investor = Balance.load(investorAddress.toHexString());
  if (investor == null) {
    investor = new Balance(investorAddress.toHexString());
    investor.address = investorAddress;
  }
  investor.balance = litRoad.balances(investorAddress);
  investor.save();
}

export function handleSell(event: Sell): void {
  let sell = new Item(event.params._itemId.toHexString());
  sell.itemId = event.params._itemId;
  sell.seller = event.params._seller;
  sell.investor = event.params._investor;
  sell.uri = event.params._uri;
  sell.price = event.params._price;
  sell.transactionHash = event.transaction.hash;
  sell.save();
}

export function handleWithdraw(event: Withdraw): void {
  let withdraw = new Withdrawal(event.transaction.hash.toHex() + "-" + event.params._to.toHexString() + "-" + event.params._amount.toHexString());
  withdraw.to = event.params._to;
  withdraw.amount = event.params._amount;
  withdraw.transactionHash = event.transaction.hash;
  withdraw.save();

  let litRoad = LitRoad.bind(event.address);

  let to = Balance.load(event.params._to.toHexString());
  if (to == null) {
    to = new Balance(event.params._to.toHexString());
  }
  to.address = event.params._to;
  to.balance = litRoad.balances(event.params._to);
  to.save();
}
