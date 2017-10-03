import SPELLS from 'common/SPELLS';
import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';

/* eslint-disable no-unused-vars */

class CastEfficiency extends CoreCastEfficiency {
    static CPM_ABILITIES = [
        ...CoreCastEfficiency.CPM_ABILITIES,
        {
            spell: SPELLS.BATTLE_CRY, // TODO: Reduced by Convergence of Fates
            category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
            getCooldown: haste => 90,
            recommendedCastEfficiency: 1.0,
        },
        {
            spell: SPELLS.AVATAR,
            category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
            getCooldown: haste => 90,
            recommendedCastEfficiency: 1.0,
            isActive: combatant => combatant.hasTalent(SPELLS.AVATAR_TALENT.id),
        },
        {
            spell: SPELLS.ODYNS_FURY,
            category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
            getCooldown: haste => 45,
            recommendedCastEfficiency: 1.0,
        },
        // Defensive
        {
            spell: SPELLS.BERSERKER_RAGE,
            category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
            getCooldown: haste => 60,
            recommendedCastEfficiency: 1.0,
            extraSuggestion: 'This is a defensive cooldown and should be used whenever needed. Cast efficiency is not really relevant for this.',
        },
        {
            spell: SPELLS.ENRAGED_REGENERATION,
            category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
            getCooldown: haste => 120,
            recommendedCastEfficiency: 1.0,
            extraSuggestion: 'This is a defensive cooldown and should be used whenever needed. Cast efficiency is not really relevant for this.',
        },
        {
            spell: SPELLS.COMMANDING_SHOUT,
            category: CastEfficiency.SPELL_CATEGORIES.OTHERS,
            getCooldown: haste => 120,
            recommendedCastEfficiency: 1.0,
            extraSuggestion: 'This is a defensive raid wide cooldown and should be used whenever needed or called by your healers.',
        },
        /*
        {
            spell: SPELLS.SHADOW_DANCE,
            category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
            getCooldown: haste => 60, // TODO: Reduced by a passive.
            charges: 2,
            recommendedCastEfficiency: 0.95,
        },*/
    ];
}

export default CastEfficiency;
