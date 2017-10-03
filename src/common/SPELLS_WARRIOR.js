/**
 * All Warrior abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  // Arms:
  // ...

  // Fury:
  // ...

  // Protection:
  //Rotational Spells
  DEVASTATE: {
    id: 20243,
    name: 'Devastate',
    icon: 'inv_sword_11',
  },
  REVENGE: {
    id: 6572,
    name: 'Revenge',
    icon: 'ability_warrior_revenge',
  },
  SHIELD_SLAM: {
    id: 23922,
    name: 'Shield Slam',
    icon: 'inv_shield_05',
  },
  THUNDER_CLAP: {
    id: 6343,
    name: 'Thunder Clap',
    icon: 'spell_nature_thunderclap',
  },
  //Mitigation Spells
  IGNORE_PAIN: {
    id: 190456,
    name: 'Ignore Pain',
    icon: 'ability_warrior_renewedvigor',
  },
  NELTHARIONS_FURY: {
    id: 203526,
    name: 'Neltharion\'s Fury',
    icon: 'warrior_talent_icon_furyintheblood',
  },
  SHIELD_BLOCK: {
    id: 2565,
    name: 'Shield Block',
    icon: 'ability_defend',
  },
  SHIELD_BLOCK_BUFF: {
    id: 132404,
    name: 'Shield Block Buff',
    icon: 'ability_defend',
  },
  //Cooldown Spells
  DEMORALIZING_SHOUT: {
    id: 1160,
    name: 'Demoralizing Shout',
    icon: 'ability_warrior_warcry',
  },
  LAST_STAND: {
    id: 12975,
    name: 'Last Stand',
    icon: 'spell_holy_ashestoashes',
  },
  SHIELD_WALL: {
    id: 871,
    name: 'Shield Wall',
    icon: 'ability_warrior_shieldwall',
  },
  SPELL_REFLECTION: {
    id: 23920,
    name: 'Spell Reflection',
    icon: 'ability_warrior_shieldreflection',
  },
  //Utility Spells
  HEROIC_LEAP: {
    id: 6544,
    name: 'Heroic Leap',
    icon: 'ability_heroicleap',
  },
  HEROIC_THROW: {
    id: 57755,
    name: 'Heroic Throw',
    icon: 'inv_axe_66',
  },
  INTERCEPT: {
    id: 198304,
    name: 'Intercept',
    icon: 'ability_warrior_victoryrush',
  },
  TAUNT: {
    id: 355,
    name: 'Taunt',
    icon: 'spell_nature_reincarnation',
  },
  //Passives
  DEEP_WOUNDS: {
    id: 115767,
    name: 'Deep WOunds',
    icon: 'ability_backstab',
  },
  //Relics
  //Tier Set Bonuses

  // Fury
    // Buffs
    AVATAR: {
        id: 107574,
        name: 'Avatar',
        icon: 'warrior_talent_icon_avatar'
    },
    ENRAGE: {
        id: 184362,
        name: 'Enrage',
        icon: 'spell_shadow_unholyfrenzy'
    },
    FROTHING_BERSERKER: {
        id: 215572,
        name: 'Frothing Berserker',
        icon: 'warrior_talent_icon_furyintheblood'
    },
    // Buffs end

    // Offensive
    WHIRLWIND: {
        id: 199667,
        name: 'Whirlwind',
        icon: 'ability_whirlwind',
    },
    WHIRLWIND_OFFHAND: {
        id: 44949,
        name: 'Whirlwind Off-Hand',
        icon: 'ability_whirlwind',
    },
    BLOODTHIRST: {
        id: 23881,
        name: 'Bloodthirst',
        icon: 'spell_nature_bloodlust',
    },
    RAGING_BLOW: {
        id: 96103,
        name: 'Raging Blow',
        icon: 'warrior_wild_strike',
    },
    FURIOUS_SLASH: {
        id: 100130,
        name: 'Furious Slash',
        icon: 'ability_warrior_weaponmastery',
    },
    EXECUTE: {
        id: 5308,
        name: 'Execute',
        icon: 'inv_sword_48',
    },
    ODYNS_FURY: {
        id: 205547,
        name: 'Odyn\'s Fury',
        icon: 'inv_sword_1h_artifactvigfus_d_01',
    },
    // Offensive End

    // Defensives
    ENRAGED_REGENERATION: {
        id: 184364,
        name: 'Enraged Regeneration',
        icon: 'ability_warrior_focusedrage',
    },
    GIFT_OF_THE_NAARU: {
        id: 28880,
        name: 'Gift of the Naaru',
        icon: 'spell_holy_holyprotection',
    },
    BERSERKER_RAGE: {
        id: 18499,
        name: 'Berserker Rage',
        icon: 'spell_nature_ancestralguardian',
    },
    COMMANDING_SHOUT: {
        id: 97462,
        name: 'Commanding Shout',
        icon: 'ability_warrior_rallyingcry',
    },
    // Defensives End


  // Shared:
  BATTLE_CRY: {
    id: 1719,
    name: 'Battle Cry',
    icon: 'warrior_talent_icon_innerrage',
  },
  BERSERKER_RAGE: {
    id: 18499,
    name: 'Berserker Rage',
    icon: 'spell_nature_ancestralguardian',
  },
  PUMMEL: {
    id: 6552,
    name: 'Pummel',
    icon: 'inv_gauntlets_04',
  },
  VICTORY_RUSH: {
    id: 34428,
    name: 'Victory Rush',
    icon: 'ability_warrior_devastate',
  },
};
