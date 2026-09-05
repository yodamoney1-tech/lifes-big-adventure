/* Life's Big Adventure — original family life-path game data.
   Inspired by the classic spin-and-move life board game, not a copy of any branded edition. */

(function (global) {
  const careers = [
    { id: "doctor", name: "Doctor", emoji: "🩺", salary: 80000, tax: 20000, degree: true, perk: "hospital" },
    { id: "engineer", name: "Engineer", emoji: "🛠️", salary: 70000, tax: 15000, degree: true, perk: "build" },
    { id: "teacher", name: "Teacher", emoji: "📚", salary: 50000, tax: 8000, degree: true, perk: "school" },
    { id: "scientist", name: "Scientist", emoji: "🔬", salary: 65000, tax: 12000, degree: true, perk: "lab" },
    { id: "vet", name: "Vet", emoji: "🐾", salary: 60000, tax: 10000, degree: true, perk: "pet" },
    { id: "lawyer", name: "Lawyer", emoji: "⚖️", salary: 90000, tax: 25000, degree: true, perk: "court" },
    { id: "chef", name: "Chef", emoji: "🍳", salary: 45000, tax: 8000, degree: false, perk: "food" },
    { id: "athlete", name: "Athlete", emoji: "⚽", salary: 40000, tax: 5000, degree: false, perk: "sport" },
    { id: "artist", name: "Artist", emoji: "🎨", salary: 35000, tax: 5000, degree: false, perk: "art" },
    { id: "mechanic", name: "Mechanic", emoji: "🔧", salary: 40000, tax: 6000, degree: false, perk: "car" },
    { id: "police", name: "Police Officer", emoji: "🚓", salary: 50000, tax: 8000, degree: false, perk: "rescue" },
    { id: "farmer", name: "Farmer", emoji: "🌾", salary: 40000, tax: 5000, degree: false, perk: "farm" },
    { id: "pilot", name: "Pilot", emoji: "✈️", salary: 55000, tax: 10000, degree: false, perk: "travel" },
    { id: "baker", name: "Baker", emoji: "🥐", salary: 35000, tax: 4000, degree: false, perk: "food" },
  ];

  const houses = [
    { id: "cottage", name: "Cosy Cottage", emoji: "🏑", price: 80000, value: 105000 },
    { id: "flat", name: "City Flat", emoji: "🏢", price: 120000, value: 145000 },
    { id: "family", name: "Family House", emoji: "🏠", price: 180000, value: 230000 },
    { id: "villa", name: "Dream Villa", emoji: "🏰", price: 300000, value: 390000 },
    { id: "boat", name: "Houseboat", emoji: "⛵", price: 90000, value: 115000 },
    { id: "tree", name: "Treehouse Manor", emoji: "🌳", price: 150000, value: 195000 },
  ];

  const childNames = [
    "Pip", "Bean", "Noodle", "Star", "Maple", "Sunny", "Ziggy", "Pebble",
    "Coco", "Bumble", "Rain", "Juniper", "Toast", "Mango", "Pixel", "Honey",
  ];

  const petNames = ["Biscuit", "Socks", "Waffle", "Mochi", "Pickle", "Cloud", "Nugget", "Sprout"];

  const events = [
    { title: "Lost wallet!", text: "It slipped out at the shops.", cash: -15000 },
    { title: "Found a fiver in a coat", text: "Then another, then a bundle!", cash: 20000 },
    { title: "Bake-off winner", text: "The lemon drizzle was legendary.", cash: 15000, perk: "food" },
    { title: "Sports day glory", text: "First place in the parents' race.", cash: 15000, perk: "sport" },
    { title: "Art fair smash", text: "Someone bought three paintings.", cash: 25000, perk: "art" },
    { title: "School disco tickets", text: "Juice, glow sticks, chaos.", cash: -8000, perk: "school" },
    { title: "Car repair", text: "That clunk was not a good clunk.", cash: -20000, perk: "car" },
    { title: "Rescue bonus", text: "You helped a neighbour in a pickle.", cash: 15000, perk: "rescue" },
    { title: "Farmers' market", text: "The jam stall went wild.", cash: 12000, perk: "farm" },
    { title: "Science prize", text: "Your volcano actually volcanoed.", cash: 20000, perk: "lab" },
    { title: "Hospital fundraiser", text: "You organised the whole thing.", cash: 18000, perk: "hospital" },
    { title: "Court-day overtime", text: "Long day, bigger pay.", cash: 20000, perk: "court" },
    { title: "Weekend trip", text: "Train tickets and ice cream.", cash: -12000, perk: "travel" },
    { title: "New sofa", text: "It is extremely sit-on-able.", cash: -15000 },
    { title: "Street party", text: "You brought the bunting.", cash: 8000 },
    { title: "Leaky roof", text: "Buckets were involved.", cash: -18000, perk: "build" },
    { title: "Talent show", text: "The kids stole the show.", cash: 10000, needKids: true },
    { title: "Birthday party", text: "Pass the parcel got out of hand.", cash: -10000, needKids: true },
    { title: "Tooth fairy mix-up", text: "She left a gold coin. Weird, but nice.", cash: 15000, needKids: true },
    { title: "Pet vet bill", text: "Somebody ate a sock. Again.", cash: -12000, needPet: true, perk: "pet" },
    { title: "Lottery scratchcard", text: "Not the jackpot. Still a treat.", cash: 10000 },
    { title: "Parking ticket", text: "The sign was hiding in a hedge.", cash: -5000 },
    { title: "Charity fun run", text: "You wheezed, you finished, you got donated to.", cash: 12000 },
    { title: "Broken phone", text: "It met a puddle.", cash: -10000 },
    { title: "Grandparent gift", text: "A surprise envelope in the post.", cash: 25000 },
    { title: "Storm damage", text: "The trampoline has left the garden.", cash: -15000 },
    { title: "Yard sale", text: "One person's junk, everyone's treasure.", cash: 15000 },
    { title: "Concert night", text: "Earplugs were a good idea.", cash: -8000 },
  ];

  function S(id, opts) {
    return { id, title: "", text: "", kind: "action", emoji: "⭐", stop: false, payday: false, ...opts };
  }

  const spaces = [
    S("start", { title: "Start", emoji: "🚦", kind: "start", text: "Uni or a job — big first choice.", nextCollege: "c1", nextCareer: "j1" }),
    S("c1", { title: "Freshers' Week", emoji: "🎉", kind: "action", text: "Pizza, maps, and getting lost.", next: "c2", track: "uni" }),
    S("c2", { title: "Night in the library", emoji: "📖", kind: "action", text: "You definitely meant to leave at 8.", next: "c3", track: "uni" }),
    S("c3", { title: "Campus café job", emoji: "☕", kind: "bonus", text: "Part-time wages land in your pocket.", cash: 10000, next: "c4", track: "uni" }),
    S("c4", { title: "Sports day", emoji: "🏅", kind: "action", text: "Egg-and-spoon is a serious sport.", next: "c5", track: "uni" }),
    S("c5", { title: "Exam week", emoji: "✏️", kind: "action", text: "Brain gone. Snacks remaining.", cash: -5000, next: "c6", track: "uni" }),
    S("c6", { title: "Graduation", emoji: "🎓", kind: "grad", text: "Hat, gown, and a proper job at last.", stop: true, next: "m1", track: "uni" }),
    S("j1", { title: "First day nerves", emoji: "💼", kind: "action", text: "You packed two packed lunches.", next: "j2", track: "job" }),
    S("j2", { title: "Early Payday", emoji: "💰", kind: "payday", payday: true, text: "Starting work first pays off already.", next: "j3", track: "job" }),
    S("j3", { title: "Team lunch", emoji: "🥪", kind: "action", text: "You offered to get the coffees.", cash: -5000, next: "m1", track: "job" }),
    S("m1", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Salary in. Kids' snacks out.", next: "m2", track: "life" }),
    S("m2", { title: "Surprise post", emoji: "✉️", kind: "action", text: "Could be a bill. Could be a card.", next: "m3", track: "life" }),
    S("m3", { title: "Lucky Number", emoji: "🍀", kind: "lucky", text: "Pick a number. When anyone spins it, you get paid.", next: "m4", track: "life" }),
    S("m4", { title: "Park picnic", emoji: "🥯", kind: "action", text: "Wasps included free of charge.", next: "m5", track: "life" }),
    S("m5", { title: "Weekend wobble", emoji: "🎢", kind: "action", text: "Plans changed. They always do.", next: "m6", track: "life" }),
    S("m6", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Another month, another pile of coins.", next: "m7", track: "life" }),
    S("m7", { title: "Get Married", emoji: "💍", kind: "marry", stop: true, text: "Stop here — big day, extra passenger.", next: "m8", track: "life" }),
    S("m8", { title: "Honeymoon", emoji: "🌅", kind: "honeymoon", text: "Stay home and save, or splash out.", next: "m9", track: "life" }),
    S("m9", { title: "House hunting", emoji: "🔑", kind: "action", text: "You looked at eight kitchens.", next: "m10", track: "life" }),
    S("m10", { title: "A baby!", emoji: "👶", kind: "baby", text: "Pop a new peg in the car.", kids: 1, next: "m11", track: "life" }),
    S("m11", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Pay day, play day.", next: "m12", track: "life" }),
    S("m12", { title: "Night school", emoji: "🌙", kind: "night", text: "Change career? It costs, but it can pay.", next: "m13", track: "life" }),
    S("m13", { title: "Twins?!", emoji: "👶", kind: "baby", text: "The car is getting crowded.", kids: 2, next: "m14", track: "life" }),
    S("m14", { title: "A pet joins in", emoji: "🐶", kind: "pet", text: "Fur, fuss, and a lot of love.", next: "m15", track: "life" }),
    S("m15", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Collect your salary as you roll by.", next: "m16", track: "life" }),
    S("m16", { title: "Buy a House", emoji: "🏠", kind: "house", stop: true, text: "Stop here — cash, mortgage, or keep renting.", next: "m17", track: "life" }),
    S("m17", { title: "Street party", emoji: "🎊", kind: "action", text: "Bunting, cake, and a wobbly table.", next: "m18", track: "life" }),
    S("m18", { title: "School play", emoji: "🎭", kind: "schoolplay", text: "Someone was a very committed tree.", next: "m19", track: "life" }),
    S("m19", { title: "The Bank", emoji: "🏦", kind: "bank", text: "Pay off loans, or leave them (and pay interest).", next: "m20", track: "life" }),
    S("m20", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Ka-ching.", next: "m21", track: "life" }),
    S("m21", { title: "Holiday choice", emoji: "🧳", kind: "holiday", text: "Staycation or a proper splash?", next: "m22", track: "life" }),
    S("m22", { title: "Career spotlight", emoji: "🌟", kind: "spotlight", text: "If this is your kind of work, you get a bonus.", next: "m23", track: "life" }),
    S("m23", { title: "Life happens", emoji: "🌀", kind: "action", text: "One of those weeks.", next: "m24", track: "life" }),
    S("m24", { title: "One more baby?", emoji: "👶", kind: "baby", text: "The car still has a spare seat. Just about.", kids: 1, next: "m25", track: "life" }),
    S("m25", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Collect on the way past.", next: "m26", track: "life" }),
    S("m26", { title: "Midlife twist", emoji: "🎡", kind: "action", text: "New hobby. New bill. New stories.", next: "m27", track: "life" }),
    S("m27", { title: "Loan office", emoji: "🏦", kind: "bank", text: "Clear your debts or keep rolling them.", next: "m28", track: "life" }),
    S("m28", { title: "Payday", emoji: "💰", kind: "payday", payday: true, text: "Almost there.", next: "m29", track: "life" }),
    S("m29", { title: "Retire!", emoji: "🌅", kind: "retire", stop: true, text: "Quiet Meadows is safe. Harbour Heights is spicy.", nextMeadow: "md1", nextHarbour: "hb1", track: "life" }),
    S("md1", { title: "Country lane", emoji: "🛤️", kind: "action", text: "Birds, hedges, no rush.", cash: 10000, next: "md2", track: "meadow" }),
    S("md2", { title: "Garden party", emoji: "🍰", kind: "action", text: "You brought the good cake.", cash: 15000, next: "md3", track: "meadow" }),
    S("md3", { title: "Pension payday", emoji: "💰", kind: "payday", payday: true, text: "A calm last payday.", next: "md4", track: "meadow" }),
    S("md4", { title: "Quiet Meadows", emoji: "🏁", kind: "finish", text: "You made it — count the fortune.", track: "meadow" }),
    S("hb1", { title: "Stock splash", emoji: "📈", kind: "stocks", text: "Even spin: big win. Odd spin: ouch.", next: "hb2", track: "harbour" }),
    S("hb2", { title: "City rent", emoji: "🌆", kind: "action", text: "The view is expensive.", cash: -20000, next: "hb3", track: "harbour" }),
    S("hb3", { title: "Harbour jackpot", emoji: "💎", kind: "jackpot", text: "Flick again. 8, 9 or 10 is huge.", next: "hb4", track: "harbour" }),
    S("hb4", { title: "Harbour Heights", emoji: "🏁", kind: "finish", text: "You made it — count the fortune.", track: "harbour" }),
  ];

  const spaceMap = Object.fromEntries(spaces.map((s) => [s.id, s]));

  const COLORS = [
    { id: "ruby", name: "Ruby", hex: "#e23b5a", dark: "#9b1733" },
    { id: "sky", name: "Sky", hex: "#2b8cff", dark: "#0d4f9c" },
    { id: "sun", name: "Sunshine", hex: "#f0c000", dark: "#9a6d00" },
    { id: "leaf", name: "Leaf", hex: "#22a35a", dark: "#0d6a36" },
  ];

  global.LBA = { careers, houses, events, spaces, spaceMap, childNames, petNames, COLORS };
})(window);
