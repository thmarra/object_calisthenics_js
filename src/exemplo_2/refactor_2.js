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
    this.address = undefined;
  }

  addGift(gift, position) {
    const wrappedGift = new Wrap(gift);
    
    if (position) {
      wrappedGift.gift.position = position;
    }
    
    wrappedGift.wrap();
    this.gifts.push(wrappedGift);
  }

  setAddress(address) {
    this.address = address;
  }

  deliver() {
    this.gifts.forEach(wrappedGift => {
      wrappedGift.sendTo(this.address);
    });
  }
}

module.exports = () => {
  const giftsCollection = new WrappedGiftsCollection();
  giftsCollection.addGift('meter long plush dinosaur', 'horizontal');
  giftsCollection.addGift('chocolate');
  giftsCollection.addGift('book');
  
  giftsCollection.setAddress('Rua Olimpíadas, 205');

  giftsCollection.deliver();
};
