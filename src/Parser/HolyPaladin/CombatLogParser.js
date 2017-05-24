import React from 'react';

import MainCombatLogParser from 'Parser/Core/CombatLogParser';
import ParseResults from 'Parser/Core/ParseResults';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';

import SuggestionsTab from 'Main/SuggestionsTab';
import StatisticBox from 'Main/StatisticBox';

import DevotionAura from './Modules/Features/DevotionAura';

function formatThousands(number) {
  return (Math.round(number || 0) + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatNumber(number) {
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(2)}m`;
  }
  if (number > 10000) {
    return `${Math.round(number / 1000)}k`;
  }
  return formatThousands(number);
}
function getRawHealing(ability) {
  return ability.healingEffective + ability.healingAbsorbed + ability.healingOverheal;
}
function getOverhealingPercentage(ability) {
  return ability.healingOverheal / getRawHealing(ability);
}
function formatPercentage(percentage) {
  return (Math.round((percentage || 0) * 10000) / 100).toFixed(2);
}

class CombatLogParser extends MainCombatLogParser {
  static specModules = {
    devotionAura: DevotionAura,
  };

  generateResults() {
    const results = new ParseResults();

    results.statistics = [
      <StatisticBox
        icon={<SpellIcon id={SPELLS.DEVOTION_AURA_TALENT.id} />}
        value={`${formatNumber(this.modules.devotionAura.healing / this.fightDuration * 1000)} HPS`}
        label="Healing done"
      />
    ];

    results.tabs = [
      {
        title: 'Suggestions',
        url: 'suggestions',
        render: () => (
          <SuggestionsTab issues={results.issues} />
        ),
      },
    ];

    return results;
  }
}

export default CombatLogParser;
