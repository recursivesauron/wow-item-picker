type Item = {
    itemId: number;
    itemName: string;
    ilvl: number;
    itemIcon: string;
    mainStat: number;
    stamina: number;
    secondaryStat1Name: string;
    secondaryStat1Value: number;
    secondaryStat2Name: string;
    secondaryStat2Value: number;
    category: string;
    type: string;
}

type MainHand = Item & {
    damage: number;
    enchantment: String | null;
}

type Clothing = Item & {
    socket: Boolean;
    gemIcon: String | null;
    enchantment: String | null;
}

export { Item, MainHand, Clothing };