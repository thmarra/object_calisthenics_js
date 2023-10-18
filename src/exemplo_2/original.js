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

  sendToAddr(address) {
    console.log(`> Sending gift to ${address}`);
  }
}

module.exports = () => {
  const wrappedGift1 = new Wrap('meter long plush dinosaur');
  const wrappedGift2 = new Wrap('chocolate');
  const wrappedGift3 = new Wrap('book');
  const address = 'Rua Olimpíadas, 205';

  wrappedGift1.gift.position = "horizontal";
  wrappedGift1.wrap();
  wrappedGift2.wrap();
  wrappedGift3.wrap();

  wrappedGift1.sendToAddr(address);
  wrappedGift2.sendToAddr(address);
  wrappedGift3.sendToAddr(address);
};
