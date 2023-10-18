class Gift {
  constructor(gift) {
    this.object = gift;
    this.position = "vertical";
  }

  toString() {
    return this.object;
  }
}

class Wrap {
  constructor(gift) {
    this.gift = new Gift(gift);
  }

  rotate() {
    this.gift.position =
      this.gift.position === "horizontal" ? "vertical" : "horizontal";
  }

  wrap() {
    console.log(`> Wrapping ${this.gift} on ${this.gift.position} position`);
  }

  sendTo(address) {
    console.log(`> Sending gift to ${address}`);
  }
}

class WrappedGiftsCollection {
  constructor() {
    this.gifts = [];
  }

  addGift(gift, rotate = false) {
    const wrappedGift = new Wrap(gift);

    if(rotate) {
      wrappedGift.rotate();
    }
    
    wrappedGift.wrap();

    this.gifts.push(wrappedGift);
  }

  deliver(address) {
    this.gifts.forEach((wrappedGift) => {
      wrappedGift.sendTo(address);
    });
  }
}

module.exports = () => {
  const giftsCollection = new WrappedGiftsCollection();

  giftsCollection.addGift("meter long plush dinosaur", true);
  giftsCollection.addGift("chocolate");
  giftsCollection.addGift("book");

  giftsCollection.deliver("Rua Olimpíadas, 205");
};
