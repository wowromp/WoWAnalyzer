import React from 'react';

import Icon from 'common/Icon';
import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import StatisticBox from 'Main/StatisticBox';
import SuggestionsTab from 'Main/SuggestionsTab';
import Tab from 'Main/Tab';
import Talents from 'Main/Talents';

import CastEfficiency from './Modules/Features/CastEfficiency';
//import ShadowDance from './Modules/Features/ShadowDance';


function formatThousands(number) {
  return (`${Math.round(number || 0)}`).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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

function formatPercentage(percentage) {
  return (Math.round((percentage || 0) * 10000) / 100).toFixed(2);
}

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    //shadowDance: ShadowDance,
    castEfficiency: CastEfficiency,
  };

  generateResults() {
    const results = super.generateResults();

    const fightDuration = this.fightDuration;


    results.tabs = [
        {
            title: 'Suggestions',
            url: 'suggestions',
            render: () => (
                <SuggestionsTab issues={results.issues} />
            ),
        },
        {
            title: 'Talents',
            url: 'talents',
            render: () => (
                <Tab title="Talents">
                <Talents combatant={this.modules.combatants.selected} />
                </Tab>
            ),
        },

        ...results.tabs,
    ];

    results.statistics = [
      <StatisticBox
        icon={<Icon icon="class_warrior" alt="Damage Per Second" />}
        value={`${formatNumber(this.modules.damageDone.total.effective / fightDuration * 1000)} DPS`}
        label={(
          <dfn data-tip={`The total damage done recorded was ${formatThousands(this.modules.damageDone.total.effective)}.`}>
            Damage done
          </dfn>
        )}
      />,

      <StatisticBox
        icon={<SpellIcon id={SPELLS.ENRAGE.id} />}
        value={`${formatPercentage((this.modules.combatants.selected.getBuffUptime(SPELLS.ENRAGE.id) / this.fightDuration))} %`}
        label={(
          <dfn data-tip={'Enrage up time'}>
            Enrage up time
          </dfn>
        )}
      />,

    this.modules.combatants.selected.hasTalent(SPELLS.FROTHING_BERSERKER_TALENT.id) && (
    <StatisticBox
        icon={<SpellIcon id={SPELLS.FROTHING_BERSERKER.id} />}
        value={`${formatPercentage((this.modules.combatants.selected.getBuffUptime(SPELLS.FROTHING_BERSERKER.id) / this.fightDuration))} %`}
        label={(
          <dfn data-tip={'Frothing Berserker up time'}>
            Frothing Berserker up time
          </dfn>
        )}
      />
    ),

        this.modules.combatants.selected.hasTalent(SPELLS.AVATAR_TALENT.id) && (
            <StatisticBox
                icon={<SpellIcon id={SPELLS.AVATAR.id} />}
                value={`${formatPercentage((this.modules.combatants.selected.getBuffUptime(SPELLS.AVATAR.id) / this.fightDuration))} %`}
                label={(
                    <dfn data-tip={'Avatar up time'}>
                        Avatar up time
                    </dfn>
                )}
            />
        ),

      <StatisticBox
        icon={<SpellIcon id={SPELLS.SYMBOLS_OF_DEATH.id} />}
        value={`${formatPercentage((this.modules.combatants.selected.getBuffUptime(SPELLS.SYMBOLS_OF_DEATH.id) / this.fightDuration))} %`}
        label={(
          <dfn data-tip={'Symbols of Death up time'}>
            Symbols of Death up time
          </dfn>
        )}
      />,,

      ...results.statistics,
    ];
    return results;
  }
}

export default CombatLogParser;
