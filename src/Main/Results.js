import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';

import ItemLink from 'common/ItemLink';
import ItemIcon from 'common/ItemIcon';
import getBossName from 'common/getBossName';
import { formatNumber, formatThousands } from 'common/format';
import SPECS from 'common/SPECS';

import DevelopmentTab from 'Main/DevelopmentTab';
import EventsTab from 'Main/EventsTab';
import Tab from 'Main/Tab';
import Status from 'Main/Status';

import './Results.css';
import { formatPercentage } from "../common/format";

class Results extends React.Component {
  static childContextTypes = {
    updateResults: PropTypes.func.isRequired,
  };
  getChildContext() {
    return {
      updateResults: this.forceUpdate.bind(this),
    };
  }
  static contextTypes = {
    config: PropTypes.object.isRequired,
  };
  static propTypes = {
    parser: PropTypes.object.isRequired,
    tab: PropTypes.string,
    onChangeTab: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const { parser, tab, onChangeTab } = this.props;
    const report = parser.report;
    const fight = parser.fight;
    const config = this.context.config;
    const modules = parser._modules;
    const selectedCombatant = modules.combatants.selected;
    if (!selectedCombatant) {
      return (
        <div>
          <h1>
            <div className="back-button">
              <Link to={`/report/${report.code}/${fight.id}`} data-tip="Back to player selection">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden />
              </Link>
            </div>
            Initializing report...
          </h1>

          <div className="spinner" />
        </div>
      );
    }

    const results = parser.generateResults();

    if (process.env.NODE_ENV === 'development') {
      results.tabs.push({
        title: 'Development',
        url: 'development',
        render: () => (
          <DevelopmentTab
            parser={parser}
            results={results}
          />
        ),
      });
      results.tabs.push({
        title: 'Events',
        url: 'events',
        render: () => (
          <EventsTab
            parser={parser}
          />
        ),
      });
      results.tabs.push({
        title: 'Status',
        url: 'status',
        render: () => (
          <Tab title="Status" style={{ padding: '15px 22px' }}>
            <Status />
          </Tab>
        ),
      });
    }

    const tabUrl = tab || results.tabs[0].url;
    const activeTab = results.tabs.find(tab => tab.url === tabUrl);

    const healingDone = modules.healingDone;
    const damageDone = modules.damageDone;
    const damageTaken = modules.damageTaken;
    const alwaysBeCasting = modules.alwaysBeCasting;

    const regularHps = healingDone.total.regular / parser.fightDuration * 1000 || 0;
    const absorbedHps = healingDone.total.absorbed / parser.fightDuration * 1000 || 0;
    const hps = regularHps + absorbedHps;
    const overhealingPerSecond = healingDone.total.overheal / parser.fightDuration * 1000 || 0;
    const regularDps = damageDone.total.regular / parser.fightDuration * 1000 || 0;
    const absorbedDps = damageDone.total.absorbed / parser.fightDuration * 1000 || 0;
    const dps = regularDps + absorbedDps;
    const dtps = damageTaken.total.effective / parser.fightDuration * 1000 || 0;
    const downtime = alwaysBeCasting.totalTimeWasted / parser.fightDuration || 0;

    const iconSize = 30;

    const healingBlock = 33333;
    const damageBlock = 33333;

    return (
      <div style={{ width: '100%' }}>
        <div className="row" style={{ marginTop: 60 }}>
          <div className="col-md-8" style={{ position: 'relative' }}>
            <div className="back-button" style={{ fontSize: 36, width: 20 }}>
              <Link to={`/report/${report.code}/${fight.id}`} data-tip="Back to player selection">
                <span className="glyphicon glyphicon-chevron-left" aria-hidden />
              </Link>
            </div>
            <h1 style={{ marginBottom: 0, fontSize: 48, textTransform: 'none' }}>
              {getBossName(fight)} by <span className={config.spec.className.replace(' ', '')}>{selectedCombatant.name}</span>
            </h1>
          </div>
          <div className="col-md-4" style={{ paddingTop: 20 }}>
            <a
              href={`https://www.warcraftlogs.com/reports/${report.code}/#fight=${fight.id}&source=${parser.playerId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pull-right"
            >
              <span className="glyphicon glyphicon-link" aria-hidden /> Open report
            </a>
          </div>
        </div>
        <div className="text-muted" style={{ marginBottom: 60 }}>
          The {config.spec.specName} {config.spec.className} analyzer is being maintained by {config.maintainer}.
        </div>

        <div className="row" style={{ marginBottom: 20 }}>
          {hps > dps && (
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-5 text-right" style={{ fontSize: 42, lineHeight: 1, letterSpacing: -0.5 }}>
                  <div style={{ fontSize: 85, letterSpacing: -1 }}>
                    {formatNumber(hps)}
                  </div>
                  healing
                  <div style={{ fontSize: 12 }}>
                    per second
                  </div>
                </div>
                <div className="col-md-7">
                  {Array(Math.round(regularHps / healingBlock)).fill().map(() => (
                    <img src="/img/healing.png" style={{ width: iconSize }} data-tip={`${formatThousands(healingBlock)} healing`} />
                  ))}
                  {Array(Math.round(absorbedHps / healingBlock)).fill().map(() => (
                    <img src="/img/absorbed.png" style={{ width: iconSize }} data-tip={`${formatThousands(healingBlock)} absorbed healing`} />
                  ))}
                  {Array(Math.round(overhealingPerSecond / healingBlock)).fill().map(() => (
                    <img src="/img/overhealing.png" style={{ width: iconSize, opacity: 0.5 }} data-tip={`${formatThousands(healingBlock)} overhealing`} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {dps > hps && (
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-5 text-right" style={{ fontSize: 42, lineHeight: 1, letterSpacing: -0.5 }}>
                  <div style={{ fontSize: 85, letterSpacing: -1 }}>
                    {formatNumber(dps)}
                  </div>
                  damage
                  <div style={{ fontSize: 12 }}>
                    per second
                  </div>
                </div>
                <div className="col-md-7">
                  {Array(Math.round(regularDps / damageBlock)).fill().map(() => (
                    <img src="/img/sword.png" style={{ width: iconSize }} data-tip={`${formatThousands(damageBlock)} damage`} />
                  ))}
                  {Array(Math.round(absorbedDps / damageBlock)).fill().map(() => (
                    <img src="/img/dps-absorbed.png" style={{ width: iconSize, opacity: 0.8 }} data-tip={`${formatThousands(damageBlock)} absorbed damage`} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {false && (
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-5 text-right" style={{ fontSize: 26, lineHeight: 1, letterSpacing: -0.5 }}>
                  <div style={{ fontSize: 58, letterSpacing: -1 }}>
                    {formatNumber(dtps)}
                  </div>
                  damage taken
                </div>
                <div className="col-md-7">
                  {Array(Math.round(dtps / 100000)).fill().map(() => (
                    <img src="/img/shield.png" style={{ width: iconSize }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-5 text-right" style={{ fontSize: 42, lineHeight: 1, letterSpacing: -0.5 }}>
                <div style={{ fontSize: 85, letterSpacing: -1 }}>
                  {formatPercentage(downtime)}%
                </div>
                downtime
              </div>
              <div className="col-md-7">
                {Array(Math.round((1 - downtime) * 60)).fill().map(() => (
                  <img
                    src={config.spec === SPECS.RETRIBUTION_PALADIN ? '/img/wheelchair.png' : '/img/play.png'}
                    data-tip={`${Math.round(parser.fightDuration / 1000 / 60 * 10) / 10} seconds (1 second for every minute in the fight)`}
                    style={{ width: iconSize }}
                  />
                ))} {Array(Math.round(Math.max(0, downtime * 60))).fill().map(() => (
                  <img
                    src="/img/afk.png"
                    data-tip={`${Math.round(parser.fightDuration / 1000 / 60 * 10) / 10} seconds (1 second for every minute in the fight)`}
                    style={{ width: iconSize }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="row statistics">
              {results.statistics
                .filter(statistic => !!statistic) // filter optionals
                .map(statistic => statistic.statistic ? statistic : { statistic, order: 0 }) // normalize
                .sort((a, b) => a.order - b.order)
                .map((statistic, i) => React.cloneElement(statistic.statistic, {
                  key: `${statistic.order}-${i}`,
                }))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel items">
              <div className="panel-heading">
                <h2><dfn data-tip="The values shown are only for the special equip effects of the items. The passive gain from the stats is <b>not</b> included.">Items</dfn>
                </h2>
              </div>
              <div className="panel-body" style={{ padding: 0 }}>
                <ul className="list">
                  {results.items.length === 0 && (
                    <li className="item clearfix" style={{ paddingTop: 20, paddingBottom: 20 }}>
                      No noteworthy items.
                    </li>
                  )}
                  {
                    results.items
                      .sort((a, b) => {
                        if (a.item && b.item) {
                          if (a.item.quality === b.item.quality) {
                            // Qualities equal = show last added item at bottom
                            return a.item.id - b.item.id;
                          }
                          // Show lowest quality item at bottom
                          return a.item.quality < b.item.quality;
                        } else if (a.item) {
                          return -1;
                        } else if (b.item) {
                          return 1;
                        }
                        // Neither is an actual item, sort by id so last added effect is shown at bottom
                        if (a.id < b.id) {
                          return -1;
                        } else if (a.id > b.id) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((item) => {
                        if (!item) {
                          return null;
                        }

                        const id = item.id || item.item.id;
                        const itemDetails = id && selectedCombatant.getItem(id);
                        const icon = item.icon || <ItemIcon id={item.item.id} details={itemDetails} />;
                        const title = item.title || <ItemLink id={item.item.id} details={itemDetails} />;

                        return (
                          <li className="item clearfix" key={id}>
                            <article>
                              <figure>
                                {icon}
                              </figure>
                              <div>
                                <header>
                                  {title}
                                </header>
                                <main>
                                  {item.result}
                                </main>
                              </div>
                            </article>
                          </li>
                        );
                      })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-body flex" style={{ padding: '0' }}>
            <div className="navigation" style={{ flex: '0 0 auto', width: 200, minHeight: 400 }}>
              <div className="panel-heading">
                <h2>Menu</h2>
              </div>
              <div style={{ padding: '10px 0' }}>
                <ul>
                  {results.tabs.map(tab => (
                    <li
                      key={tab.url}
                      className={activeTab.url === tab.url ? 'active' : ''}
                      onClick={() => onChangeTab(tab.url)}
                    >
                      {tab.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {activeTab.render()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
